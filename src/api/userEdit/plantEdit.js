import { instance } from '../../api/axios';

/**
 * @returns {Promise<Object>}
 */
export const getPreferencePlaces = async () => {
  try {
    const response = await instance.get('/members/interests/places', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        '선호 시설 가져오기 중 오류가 발생했습니다.',
    );
  }
};

/**
 * 선호 시설 저장
 * @param {Array} places
 * @returns {Promise<Object>}
 */
export const savePreferencePlaces = async (places) => {
  try {
    const response = await instance.patch(
      '/members/interests/regions',
      {
        places,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || '선호 시설 저장 중 오류가 발생했습니다.',
    );
  }
};
