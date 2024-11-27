import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://meong9.store/api/v1',
});

export const localInstance = axios.create({
  baseURL: 'http://localhost:5173',
});

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

const handleLogout = (message) => {
  alert(message || '다시 로그인해주세요.');
  localStorage.clear();
  window.location.href = `${instance.defaults.baseURL}/login`;
};

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const getAuthToken = async () => {};

const handle401Error = async (error) => {
  const originalRequest = error.config;
  const savedRefreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!savedRefreshToken) {
    handleLogout('인증 정보가 만료되었습니다. 다시 로그인 해주세요.');
    return Promise.reject(error);
  }

  try {
    const { headers } = await getAuthToken();
    localStorage.setItem(ACCESS_TOKEN, headers.access);
    localStorage.setItem(REFRESH_TOKEN, headers.refresh);
    originalRequest.headers.Authorization = `Bearer ${headers.access}`;
    return instance(originalRequest);
  } catch {
    localStorage.clear();
    alert('다시 로그인해주세요.');
    window.location.href = `${instance.defaults.baseURL}/login`;
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
