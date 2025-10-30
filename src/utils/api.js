/**
 * API 请求工具
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 保存测试结果
 * @param {object} testResult - 测试结果数据
 */
export const saveTestResult = async (testResult) => {
  try {
    const response = await api.post('/test-results', testResult);
    return response.data;
  } catch (error) {
    console.error('保存测试结果失败:', error);
    throw error;
  }
};

/**
 * 获取测试结果
 * @param {string} resultId - 结果ID
 */
export const getTestResult = async (resultId) => {
  try {
    const response = await api.get(`/test-results/${resultId}`);
    return response.data;
  } catch (error) {
    console.error('获取测试结果失败:', error);
    throw error;
  }
};

/**
 * 获取名人音域数据
 */
export const getCelebrityVocalRanges = async () => {
  try {
    const response = await api.get('/celebrities');
    return response.data;
  } catch (error) {
    console.error('获取名人数据失败:', error);
    throw error;
  }
};

export default api;

