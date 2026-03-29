import axiosInstance from './axiosInstance';

export const goalApi = {

  create: (data) =>
    axiosInstance.post('/goals', data),

  getAll: () =>
    axiosInstance.get('/goals'),

  getById: (id) =>
    axiosInstance.get(`/goals/${id}`),

  update: (id, data) =>
    axiosInstance.put(`/goals/${id}`, data),

  deposit: (id, amount) =>
    axiosInstance.patch(`/goals/${id}/deposit`, null, { params: { amount } }),

  updateStatus: (id, status) =>
    axiosInstance.patch(`/goals/${id}/status`, null, { params: { status } }),

  delete: (id) =>
    axiosInstance.delete(`/goals/${id}`),
};