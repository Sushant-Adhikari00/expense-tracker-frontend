import { useState, useEffect, useCallback } from 'react';
import { useSearchParams }                  from 'react-router-dom';
import { incomeApi }                        from '../api/incomeApi';
import toast                                from 'react-hot-toast';

export const useIncome = (initialPage = 0, pageSize = 10) => {
  const [data,    setData]    = useState({
    content: [], page: 0, totalPages: 0, totalElements: 0
  });
  const [page,    setPage]    = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [searchParams]        = useSearchParams();
  const searchQuery           = searchParams.get('search') || '';

  const fetchIncomes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await incomeApi.getAll(page, pageSize);
      let content = res.data.content ?? [];

      // Client-side filter by search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        content = content.filter(i =>
          i.source?.toLowerCase().includes(q) ||
          i.category?.toLowerCase().includes(q) ||
          i.note?.toLowerCase().includes(q)
        );
      }

      setData({ ...res.data, content });
    } catch {
      toast.error('Failed to load incomes');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, searchQuery]);

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
    searchQuery,
    setPage,
    fetchIncomes,
    createIncome,
    updateIncome,
    deleteIncome,
  };
};