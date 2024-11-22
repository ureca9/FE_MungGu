import instance from './axios';

export const fetchPetData = async () => {
  try {
    const response = await instance.get('/api/pet');
    return response.data; // 성공한 경우 데이터를 반환
  } catch (error) {
    console.error('Error 확인:', error);
    throw error; // 에러를 호출한 곳으로 전달
  }
};
