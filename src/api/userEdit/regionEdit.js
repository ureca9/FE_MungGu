import { instance } from '../../api/axios';

/**
 * @returns {Promise<Object>}
 */
export const getPreferenceRegions = async () => {
  try {
    const response = await instance.get('/members/interests/regions', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        '선호 지역 가져오기 중 오류가 발생했습니다.',
    );
  }
};

/**
 * @param {Array} regions
 * @returns {Promise<Object>}
 */
export const savePreferenceRegions = async (regions) => {
  try {
    const response = await instance.patch(
      '/members/interests/regions',
      { regions },
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
      error.response?.data?.message || '선호 지역 저장 중 오류가 발생했습니다.',
    );
  }
};
