import { instance } from './axios';

export const fetchPetData = async () => {
  try {
    const response = await instance.get('/api/pet');
    return response.data;
  } catch (error) {
    console.error('Error 확인:', error);
    throw error;
  }
};
