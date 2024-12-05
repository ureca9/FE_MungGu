import { localInstance } from './axios';

export const GetAllReviews = async () => {
  try {
    const response = await localInstance.get('/pensions/2/reviews?page=0', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log('장소 리뷰 목록 :', response);
    return response.data;
  } catch (error) {
    console.error('Error 확인:', error);
    throw error;
  }
};
