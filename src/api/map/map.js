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
    console.log(response.data.data);
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
    console.log(response.data.data.places);
    return response.data.data.places;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addLikePlace = async (placeId, categoryName) => {
  try {
    console.log(categoryName, placeId);
    if (categoryName === '"펜션"') {
      const response = await instance.post(`/pensions/likes/${placeId}`);
      console.log(response);
      return response.data;
    } else {
      const response = await instance.post(`/places/likes/${placeId}`);
      console.log(response);
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
