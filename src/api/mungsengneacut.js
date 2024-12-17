import { instance } from './axios';
import LOCAL_STORAGE_KEYS from '../utils/LocalStorageKey';

export const fetchNickname = async () => {
  try {
    const response = await instance.get('/members/detail', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200 && response.data.message === 'success') {
      return response.data.data.nickname;
    }
    return null;
  } catch (error) {
    console.error('닉네임 가져오기 오류:', error);
    throw error;
  }
};

export const fetchAllPhotos = async (page, pageSize) => {
  try {
    const response = await instance.get(
      `/photos?page=${page}&size=${pageSize}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    return response.data.data.meongPhotoList || [];
  } catch (error) {
    console.error('전체 사진 불러오기 오류:', error);
    throw error;
  }
};

export const fetchMyPhotos = async (page, pageSize) => {
  try {
    const response = await instance.get(
      `/photos/mine?page=${page}&size=${pageSize}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)}`,
        },
      },
    );

    return response.data.data.myMeongPhotoList || [];
  } catch (error) {
    console.error('내 사진 불러오기 오류:', error);
    throw error;
  }
};

export const uploadPhoto = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file, 'capturedImage.png');

    const response = await instance.post('/photos', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('사진 업로드 오류:', error);
    throw error;
  }
};

export const fetchPaginatedPhotos = async (
  page,
  pageSize,
  isMyPhotos = false,
) => {
  try {
    const url = isMyPhotos
      ? `/photos/mine?page=${page}&size=${pageSize}`
      : `/photos?page=${page}&size=${pageSize}`;

    const headers = isMyPhotos
      ? {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)}`,
        }
      : { Accept: 'application/json' };

    const response = await instance.get(url, { headers });

    return {
      photos: isMyPhotos
        ? response.data.data.myMeongPhotoList || []
        : response.data.data.meongPhotoList || [],
      hasNext: response.data.data.hasNext,
    };
  } catch (error) {
    console.error('페이지네이션 사진 불러오기 오류:', error);
    throw error;
  }
};

export const fetchDownloadUrl = async (capturedImage) => {
  if (!capturedImage) {
    console.error('capturedImage가 비어 있습니다.');
    throw new Error('다운로드할 이미지가 없습니다.');
  }

  try {
    const response = await fetch(capturedImage);
    if (!response.ok) {
      throw new Error('이미지 변환에 실패했습니다.');
    }
    const blob = await response.blob();

    const formData = new FormData();
    formData.append('image', blob, 'capturedImage.png');

    const apiResponse = await instance.post('/photos', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    return apiResponse.data?.data?.imageDownloadUrl || null;
  } catch (error) {
    console.error('다운로드 URL 가져오기 실패:', error);
    throw error;
  }
};
