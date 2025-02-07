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

    // API에서 받은 데이터를 그대로 리턴 (필요에 따라 가공 가능)
    return response.data.data;
  } catch (error) {
    // 에러 발생 시 에러 메시지를 포함한 예외를 던집니다.
    throw new Error('펜션 정보를 불러오는 데 실패했습니다.');
  }
};
