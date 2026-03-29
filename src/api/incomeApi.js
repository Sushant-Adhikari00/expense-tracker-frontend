import axiosInstance from './axiosInstance';

export const incomeApi = {

  create: (data) =>
    axiosInstance.post('/incomes', data),

  getAll: (page = 0, size = 10) =>
    axiosInstance.get('/incomes', { params: { page, size } }),

  getById: (id) =>
    axiosInstance.get(`/incomes/${id}`),

  update: (id, data) =>
    axiosInstance.put(`/incomes/${id}`, data),

  delete: (id) =>
    axiosInstance.delete(`/incomes/${id}`),
};