import axios from 'axios';

export const fetchPensionDetail = async (id) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    const headers = { Accept: 'application/json' };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await axios.get(
      `https://meong9.store/api/v1/pensions/detail/${id}`,
      { headers }
    );

    return response.data.data;
  } catch (error) {
    throw new Error('펜션 정보를 불러오는 데 실패했습니다.');
  }
};

export const togglePensionLike = async (id) => {
  try {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    if (!accessToken) throw new Error('로그인이 필요합니다.');

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    await axios.post(`https://meong9.store/api/v1/pensions/likes/${id}`, {}, { headers });

    return true;
  } catch (error) {
    throw new Error('찜 상태 업데이트 실패');
  }
};
