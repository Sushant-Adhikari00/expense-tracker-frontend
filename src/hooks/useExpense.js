import { useState, useEffect, useCallback } from 'react';
import { useSearchParams }                  from 'react-router-dom';
import { expenseApi }                       from '../api/expenseApi';
import toast                                from 'react-hot-toast';

const DEFAULT_FILTERS = {
  preset:    '',
  startDate: undefined,
  endDate:   undefined,
  category:  undefined,
  minAmount: undefined,
  maxAmount: undefined,
  title:     undefined,
};

export const useExpense = (initialPage = 0, pageSize = 10) => {
  const [data,       setData]       = useState({
    content: [], page: 0, totalPages: 0,
    totalElements: 0, totalAmount: 0, averageAmount: 0,
  });
  const [page,       setPage]       = useState(initialPage);
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [filters,    setFilters]    = useState(DEFAULT_FILTERS);
  const [isFiltered, setIsFiltered] = useState(false);

  const [searchParams] = useSearchParams();
  const searchQuery    = searchParams.get('search') || '';

  const hasActiveFilters = (f) =>
    Object.values(f).some(v => v !== undefined && v !== '' && v !== null);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      let result;

      if (hasActiveFilters(filters)) {
        const res  = await expenseApi.getFiltered({
          ...filters,
          page,
          size: pageSize,
        });
        result = res.data;
        setIsFiltered(true);
      } else {
        const res  = await expenseApi.getAll(page, pageSize);
        result = res.data;
        setIsFiltered(false);
      }

      // Apply URL search param client-side
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        result  = {
          ...result,
          content: result.content.filter(e =>
            e.title?.toLowerCase().includes(q)    ||
            e.category?.toLowerCase().includes(q) ||
            e.note?.toLowerCase().includes(q)
          ),
        };
      }

      setData(result);
    } catch {
      toast.error('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, filters, searchQuery]);

  useEffect(() => { fetchExpenses(); }, [fetchExpenses]);

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(0);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(0);
  };

  const createExpense = async (payload) => {
    setSaving(true);
    try {
      await expenseApi.create(payload);
      toast.success('Expense added successfully');
      await fetchExpenses();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add expense');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateExpense = async (id, payload) => {
    setSaving(true);
    try {
      await expenseApi.update(id, payload);
      toast.success('Expense updated successfully');
      await fetchExpenses();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update expense');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await expenseApi.delete(id);
      toast.success('Expense deleted');
      await fetchExpenses();
      return true;
    } catch {
      toast.error('Failed to delete expense');
      return false;
    }
  };

  return {
    data,
    page,
    loading,
    saving,
    filters,
    isFiltered,
    searchQuery,
    setPage,
    applyFilters,
    resetFilters,
    fetchExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
  };
};