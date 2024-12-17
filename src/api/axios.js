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

  try {
    const response = await getAuthToken();
    const newAccessToken = response.headers['authorization'].split(' ')[1];
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    return instance(originalRequest);
  } catch {
    localStorage.clear();
    const result = await Swal.fire({
      title: '로그인 후 이용해주세요.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      confirmButtonColor: '#3288FF',
      customClass: {
        cancelButton: 'swalCancelBtn',
      },
    });

    if (result.isConfirmed) {
      window.location.href = ROUTER_PATHS.LOGIN;
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      window.location.href = ROUTER_PATHS.MAIN;
    }
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
