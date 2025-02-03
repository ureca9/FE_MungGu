import axios from 'axios';

export const fetchPlaceDetail = async (id) => {
  try {
    const response = await axios.get(`https://meong9.store/api/v1/places/detail/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error('장소 정보를 불러오는 중 오류가 발생했습니다.');
  }
};
