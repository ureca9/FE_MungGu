import { instance } from './axios';

// 리뷰 목록 가져오기
export const GetPensionsReviews = async (pensionId, page = 0) => {
  try {
    const response = await instance.get(`/pensions/${pensionId}/reviews?page=${page}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log('펜션 리뷰 목록 :', response);
    return response.data;
  } catch (error) {
    console.error('리뷰 가져오기 실패:', error);
    throw error;
  }
};

// 펜션 요약 정보 가져오기
export const GetPensionsSummary = async (pensionId) => {
  try {
    const response = await instance.get(`/pensions/${pensionId}/summary`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log('펜션 요약 :', response);
    return response.data;
  } catch (error) {
    console.error('펜션 요약 가져오기 실패:', error);
    throw error;
  }
};
