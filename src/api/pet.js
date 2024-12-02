import { instance } from './axios';

export const memberData = async () => {
  try {
    // const token = localStorage.getItem('accessToken');

    // if (!token) {
    //   throw new Error('토큰이 없습니다. 로그인 상태를 확인하세요.');
    // }
    const response = await instance.get('/members', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('사용자 정보:', response.data);
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
