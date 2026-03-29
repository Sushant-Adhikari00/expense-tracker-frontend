import { useState, useEffect, useCallback } from 'react';
import { incomeApi } from '../api/incomeApi';
import toast from 'react-hot-toast';

export const useIncome = (initialPage = 0, pageSize = 10) => {
  const [data,    setData]    = useState({
    content: [], page: 0, totalPages: 0, totalElements: 0
  });
  const [page,    setPage]    = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);

  const fetchIncomes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await incomeApi.getAll(page, pageSize);
      setData(res.data);
    } catch {
      toast.error('Failed to load incomes');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => { fetchIncomes(); }, [fetchIncomes]);

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
    setPage,
    fetchIncomes,
    createIncome,
    updateIncome,
    deleteIncome,
  };
};