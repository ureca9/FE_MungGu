import instance from './axios';

export const memberData = async () => {
  try {
    const response = await instance.get('/api/member');
    return response.data;
  } catch (error) {
    console.error('Error 확인:', error);
    throw error;
  }
};
