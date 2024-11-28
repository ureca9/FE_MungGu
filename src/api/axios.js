import axios from 'axios';
import { getAuthToken } from './auth/auth.js';
import Swal from 'sweetalert2';

export const instance = axios.create({
  baseURL: 'https://meong9.store/api/v1',
  withCredentials: true,
});

export const localInstance = axios.create({
  baseURL: 'http://localhost:5173',
  withCredentials: true,
});

const ACCESS_TOKEN = 'access_token';

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const handle401Error = async (error) => {
  const originalRequest = error.config;
  try {
    const response = await getAuthToken();
    const newAccessToken = response.headers['authorization'].split(' ')[1];
    localStorage.setItem(ACCESS_TOKEN, newAccessToken);
    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    return instance(originalRequest);
  } catch {
    localStorage.clear();
    await Swal.fire({ title: '다시 로그인해주세요.', icon: 'warning' });
    window.location.href = '/login';
    return Promise.reject(error);
  }
};

instance.interceptors.response.use(
  (response) => response,
  (error) =>
    error.response.status === 401
      ? handle401Error(error)
      : Promise.reject(error),
);