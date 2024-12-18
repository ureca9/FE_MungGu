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
    return response.data;
  } catch (error) {
    console.error('리뷰 가져오기 실패:', error);
    throw error;
  }
};
// 시설 리뷰 목록 가져오기
export const GetPlaceReviews = async (placeId, page) => {
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
    return response.data;
  } catch (error) {
    console.error('시설 리뷰 가져오기 실패:', error);
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
      `https://meong9.store/api/v1/places/${placeId}/summary`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
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
      },
    });
    return response;
  } catch (error) {
    console.error('리뷰 등록 중 오류 발생:', error);
  }
};

export const GetPentionData = async ({ type, id }) => {
  try {
    const response = await instance.get(`/reviews/info?type=${type}&id=${id}`, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('리뷰작성 펜션정보 오류:', error);
  }
};
export const GetMyReviewData = async () => {
  try {
    const response = await instance.get(`/reviews`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('내 리뷰 가져오기 실패:', error);
    throw error;
  }
};
export const DeleteReview = async (reviewId) => {
  try {
    const response = await instance.delete(`/reviews/${reviewId}`, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('반려동물 삭제 오류 :', error);
  }
};

export const GetReviewBasicData = async (reviewId) => {
  try {
    const response = await instance.get(`/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error('리뷰수정 상세 정보 오류:', error);
  }
};

export const PatchReviewEdit = async (reviewFormData, reviewId) => {
  try {
    const response = await instance.patch(
      `/reviews/${reviewId}`,
      reviewFormData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('리뷰 수정 오류 :', error);
  }
};
