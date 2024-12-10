import axios from 'axios';
import { getAuthToken } from './auth/auth.js';
import Swal from 'sweetalert2';
import LOCAL_STORAGE_KEYS from '../utils/LocalStorageKey.js';
import ROUTER_PATHS from '../utils/RouterPath.js';

export const instance = axios.create({
  baseURL: 'https://meong9.store/api/v1',
  withCredentials: true,
});

export const localInstance = axios.create({
  baseURL: 'http://localhost:5173',
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const handle401Error = async (error) => {
  const originalRequest = error.config;
  const exceptionUrls = ['/members'];
  if (exceptionUrls.some((url) => originalRequest.url.includes(url))) {
    return Promise.resolve();
  }
  try {
    const response = await getAuthToken();
    const newAccessToken = response.headers['authorization'].split(' ')[1];
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    return instance(originalRequest);
  } catch {
    localStorage.clear();
    await Swal.fire({
      title: '로그인 후 이용해주세요.',
      icon: 'warning',
      confirmButtonText: '확인',
      confirmButtonColor: '#3288FF',
    });
    window.location.href = ROUTER_PATHS.LOGIN;
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
