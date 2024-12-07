import { instance } from '../axios.js';

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
      `/search?keyword=${keyword}&latitude=${latitude}&longitude=${longitude}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
