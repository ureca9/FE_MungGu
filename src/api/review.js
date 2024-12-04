import { instance } from './axios';

export const GetReviewData = async () => {
  try {
    const response = await instance.get('/spots/reviews', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log('실시간 리뷰 :', response.data);
    return response.data;
  } catch (error) {
    console.error('Error 확인:', error);
    throw error;
  }
};
