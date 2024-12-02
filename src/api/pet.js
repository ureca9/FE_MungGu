import { instance, localInstance } from './axios';

export const memberData = async () => {
  try {
    const response = await localInstance.get('/api/member');
    return response.data;
  } catch (error) {
    console.error('Error 확인:', error);
    throw error;
  }
};

export const BreedsTypeData = async () => {
  try {
    const response = await instance.get('/puppies/types');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('견종목록 오류 확인:', error);
  }
};
