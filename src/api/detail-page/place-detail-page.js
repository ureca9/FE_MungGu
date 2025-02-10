import axios from 'axios';

export const fetchPlaceDetail = async (id) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN'); // 토큰 가져오기
    const response = await axios.get(`https://meong9.store/api/v1/places/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Authorization 헤더 추가
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error('장소 정보를 불러오는 중 오류가 발생했습니다.');
  }
};
