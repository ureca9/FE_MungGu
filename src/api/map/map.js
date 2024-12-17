import { instance } from '../axios.js';
import axios from 'axios';

export const getMarkers = async () => {
  try {
    const response = await instance.get('/map/likes/points');
    return response.data.data;
  } catch (error) {
    console.error('마커 데이터를 가져오는 데 실패했습니다.', error);
    return [];
  }
};

export const searchSpot = async (keyword, latitude, longitude) => {
  try {
    const response = await instance.get(
      `/map/search?keyword=${keyword}&latitude=${latitude}&longitude=${longitude}`,
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getLikeList = async (categoryName, latitude, longitude) => {
  try {
    const response = await instance.get(
      `/map/likes/detail?categoryName=${categoryName}&latitude=${latitude}&longitude=${longitude}&page=${0}&size=${20}`,
    );
    return response.data.data.places;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addLikePlace = async (placeId, type) => {
  try {
    if (type === 'PENSION') {
      const response = await instance.post(`/pensions/likes/${placeId}`);
      return response.data;
    } else {
      const response = await instance.post(`/places/likes/${placeId}`);
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCarDirection = async (startLocation, endLocation) => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const url = 'https://apis-navi.kakaomobility.com/v1/directions';
  const origin = `${startLocation.longitude},${startLocation.latitude}`;
  const destination = `${endLocation.longitude},${endLocation.latitude}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
        'Content-Type': 'application/json',
      },
      params: {
        origin: origin,
        destination: destination,
      },
    });
    console.log(response.data);
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 했지만 상태 코드가 2xx 범위를 벗어났을 경우
      console.error('HTTP error!', error.response.status, error.response.data);
    } else if (error.request) {
      // 요청은 보내졌지만 응답이 없을 경우
      console.error('No response received:', error.request);
    } else {
      // 요청을 생성하는 과정에서 발생한 오류
      console.error('Error setting up request:', error.message);
    }
  }
};
