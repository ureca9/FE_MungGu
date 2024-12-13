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
