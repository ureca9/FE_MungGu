import axios from 'axios';

export const fetchPensions = async (page, filters) => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  try {
    const response = await axios.get(
      'https://meong9.store/api/v1/search/pensions',
      {
        params: {
          page: page,
          size: 10,
          searchWord: filters.searchWord || '',
          regionList: filters.regionList || [],
          heaviestDogWeight: filters.heaviestDogWeight || 0,
          startDate: filters.startDate || undefined,
          endDate: filters.endDate || undefined,
        },
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();
          for (const key in params) {
            if (params[key]) searchParams.append(key, params[key]);
          }
          return searchParams.toString();
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const toggleLikePension = async (pensionId) => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  if (!accessToken) return false;
  try {
    await axios.post(
      `https://meong9.store/api/v1/pensions/likes/${pensionId}`,
      {},
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return true;
  } catch (error) {
    console.error('찜 상태 업데이트 실패:', error);
    return false;
  }
};