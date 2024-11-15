import axios from 'axios';

const instance = axios.create({
  baseURL: '',
});

const ACCESS_TOKEN = 'access_token';

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
