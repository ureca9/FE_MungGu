import axios from 'axios';
import { instance } from './axios';

// 리뷰 목록 가져오기
export const GetPensionsReviews = async (pensionId, page = 0) => {
  try {
    const response = await axios.get(
      `https://meong9.store/api/v1/pensions/${pensionId}/reviews?page=${page}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('펜션 리뷰 목록 :', response);
    return response.data;
  } catch (error) {
    console.error('리뷰 가져오기 실패:', error);
    throw error;
  }
};
// 시설 리뷰 목록 가져오기
export const GetPlaceReviews = async (placeId, page = 0) => {
  try {
    const response = await axios.get(
      `https://meong9.store/api/v1/places/${placeId}/reviews?page=${page}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
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
    const response = await axios.get(
      `https://meong9.store/api/v1/pensions/${pensionId}/summary`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('펜션 요약 :', response);
    return response.data;
  } catch (error) {
    console.error('펜션 요약 가져오기 실패:', error);
    throw error;
  }
};
// 시설 요약 정보 가져오기
export const GetPlacesSummary = async (placeId) => {
  try {
    const response = await axios.get(
      `https://meong9.store/api/v1/${placeId}/summary`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('시설 요약 :', response);
    return response.data;
  } catch (error) {
    console.error('시설 요약 가져오기 실패:', error);
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

export const GetPentionData = async ({ pensionId, getPensoinData }) => {
  try {
    const response = await instance.get(
      `/pensions/detail/${pensionId}`,
      getPensoinData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log('get조건:', getPensoinData);
    console.log('get받음:', response);
    return response.data;
  } catch (error) {
    console.error('리뷰작성 펜션정보 오류:', error);
  }
};
