import { instance } from './axios';

export const GetPensionsReviews = async (pensionId, page = 0) => {
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
export const GetPensionsSummary = async (pensionId) => {
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
export const PostPensionsReview = async (reviewFormData) => {
  try {
    const response = await instance.post('/reviews', reviewFormData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('리뷰 등록 중 오류 발생:', error);
  }
};
export const GetPentionData = async () => {
  try {
    const response = await instance.get(`/pensions/detail/7`);
    return response.data;
  } catch (error) {
    console.error('펜션 정보 가져오기 오류:', error);
  }
};
