import { useState, useEffect, useCallback } from 'react';
import { expenseApi } from '../api/expenseApi';
import toast from 'react-hot-toast';

export const useExpense = (initialPage = 0, pageSize = 10) => {
  const [data,    setData]    = useState({
    content: [], page: 0, totalPages: 0, totalElements: 0
  });
  const [page,    setPage]    = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await expenseApi.getAll(page, pageSize);
      setData(res.data);
    } catch {
      toast.error('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => { fetchExpenses(); }, [fetchExpenses]);

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
    setPage,
    fetchExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
  };
};