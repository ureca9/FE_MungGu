import { instance } from '../axios.js';

export const getAuthToken = async () => {
  return await instance.post('/auth/token');
};
