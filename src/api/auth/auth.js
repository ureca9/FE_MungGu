import { instance } from '../axios.js';

export const getAuthToken = async () => {
  return await instance.put('/auth/token');
};
