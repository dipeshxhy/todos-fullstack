import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(
      error?.response?.data || {
        success: false,
        message: 'Network error',
      },
    );
  },
);
export default axiosInstance;
