import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const getToken = () => {
  const url = new URL(window.location.href);
  const token = url.searchParams.get('access_token');
  if (token) {
    localStorage.setItem('token', token);
    return token;
  }
  return localStorage.getItem('token');
};

API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export { API };

export type ApiResponse<T = unknown> = {
  message: string;
  data: T;
};

export const getAPIUrl = () => import.meta.env.VITE_API_URL || '';