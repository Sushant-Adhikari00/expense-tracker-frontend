import { useState, useEffect, useCallback } from 'react';
import { goalApi } from '../api/goalApi';
import toast from 'react-hot-toast';

export const useGoals = () => {
  const [goals,   setGoals]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    try {
      const res = await goalApi.getAll();
      setGoals(res.data);
    } catch {
      toast.error('Failed to load goals');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchGoals(); }, [fetchGoals]);

  const createGoal = async (payload) => {
    setSaving(true);
    try {
      await goalApi.create(payload);
      toast.success('Goal created successfully');
      await fetchGoals();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create goal');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateGoal = async (id, payload) => {
    setSaving(true);
    try {
      await goalApi.update(id, payload);
      toast.success('Goal updated successfully');
      await fetchGoals();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update goal');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const depositToGoal = async (id, amount) => {
    setSaving(true);
    try {
      await goalApi.deposit(id, amount);
      toast.success(`Deposited ${amount} successfully`);
      await fetchGoals();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to deposit');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateGoalStatus = async (id, status) => {
    setSaving(true);
    try {
      await goalApi.updateStatus(id, status);
      toast.success('Goal status updated');
      await fetchGoals();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await goalApi.delete(id);
      toast.success('Goal deleted');
      await fetchGoals();
      return true;
    } catch {
      toast.error('Failed to delete goal');
      return false;
    }
  };

  return {
    goals,
    loading,
    saving,
    fetchGoals,
    createGoal,
    updateGoal,
    depositToGoal,
    updateGoalStatus,
    deleteGoal,
  };
};