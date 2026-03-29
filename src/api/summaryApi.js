import axiosInstance from './axiosInstance';

export const summaryApi = {

  getMonthly: (month, year) =>
    axiosInstance.get('/summary/monthly', { params: { month, year } }),
};