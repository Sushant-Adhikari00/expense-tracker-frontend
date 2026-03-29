import axiosInstance from './axiosInstance';

export const expenseApi = {

  create: (data) =>
    axiosInstance.post('/expenses', data),

  getAll: (page = 0, size = 10) =>
    axiosInstance.get('/expenses', { params: { page, size } }),

  getById: (id) =>
    axiosInstance.get(`/expenses/${id}`),

  update: (id, data) =>
    axiosInstance.put(`/expenses/${id}`, data),

  delete: (id) =>
    axiosInstance.delete(`/expenses/${id}`),
};