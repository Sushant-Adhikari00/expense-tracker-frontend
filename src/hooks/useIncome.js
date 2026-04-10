import { useState, useEffect, useCallback } from 'react';
import { useSearchParams }                  from 'react-router-dom';
import { incomeApi }                        from '../api/incomeApi';
import toast                                from 'react-hot-toast';

const DEFAULT_FILTERS = {
  preset:    '',
  startDate: undefined,
  endDate:   undefined,
  category:  undefined,
  minAmount: undefined,
  maxAmount: undefined,
  source:    undefined,
};

export const useIncome = (initialPage = 0, pageSize = 10) => {
  const [data,    setData]    = useState({
    content: [], page: 0, totalPages: 0,
    totalElements: 0, totalAmount: 0, averageAmount: 0,
  });
  const [page,    setPage]    = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [isFiltered, setIsFiltered] = useState(false);

  const [searchParams] = useSearchParams();
  const searchQuery    = searchParams.get('search') || '';

  const hasActiveFilters = (f) =>
    Object.values(f).some(v => v !== undefined && v !== '' && v !== null);

  const fetchIncomes = useCallback(async () => {
    setLoading(true);
    try {
      let result;

      if (hasActiveFilters(filters)) {
        // Use filtered endpoint
        const res = await incomeApi.getFiltered({
          ...filters,
          page,
          size: pageSize,
        });
        result = res.data;
        setIsFiltered(true);
      } else {
        // Use standard paginated endpoint
        const res = await incomeApi.getAll(page, pageSize);
        result    = res.data;
        setIsFiltered(false);
      }

      // Apply client-side search if URL has search param
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        result = {
          ...result,
          content: result.content.filter(i =>
            i.source?.toLowerCase().includes(q)   ||
            i.category?.toLowerCase().includes(q) ||
            i.note?.toLowerCase().includes(q)
          ),
        };
      }

      setData(result);
    } catch {
      toast.error('Failed to load incomes');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, filters, searchQuery]);

  useEffect(() => { fetchIncomes(); }, [fetchIncomes]);

  // Reset page to 0 when filters change
  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(0);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(0);
  };

  const createIncome = async (payload) => {
    setSaving(true);
    try {
      await incomeApi.create(payload);
      toast.success('Income added successfully');
      await fetchIncomes();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add income');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateIncome = async (id, payload) => {
    setSaving(true);
    try {
      await incomeApi.update(id, payload);
      toast.success('Income updated successfully');
      await fetchIncomes();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update income');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await incomeApi.delete(id);
      toast.success('Income deleted');
      await fetchIncomes();
      return true;
    } catch {
      toast.error('Failed to delete income');
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
    fetchIncomes,
    createIncome,
    updateIncome,
    deleteIncome,
  };
};