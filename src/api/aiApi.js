import axiosInstance from './axiosInstance';

export const aiApi = {
  getRecommendations: () =>
    axiosInstance.get('/ai/recommendations'),
};