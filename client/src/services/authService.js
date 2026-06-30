import axiosInstance from '../utils/axios.js';

const login = async (userData) => {
  const { data } = await axiosInstance.post('/auth/login', userData);
  return data;
};

const register = async (userData) => {
  const { data } = await axiosInstance.post('/auth/register', userData);
  return data;
};

const logout = async () => {
  const { data } = await axiosInstance.post('/auth/logout');
  return data;
};

const getCurrentUser = async () => {
  const { data } = await axiosInstance.get('/auth/me');
  return data;
};

export { login, register, logout, getCurrentUser };
