import axios from 'axios';
import { instance } from './axios';

export const GetPensionsReviews = async () => {
  try {
    const response = await instance.get('/pensions/2/reviews?page=0', {
      //${pensionId}
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log('펜션 리뷰 목록 :', response);
    return response.data;
  } catch (error) {
    console.error('Error 확인:', error);
    throw error;
  }
};
export const GetPensionsSummary = async () => {
  try {
    const response = await instance.get('/pensions/2/summary', {
      //${pensionId}
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log('펜션 요약 :', response);
    return response.data;
  } catch (error) {
    console.error('Error 확인:', error);
    throw error;
  }
};
