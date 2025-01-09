import { instance } from '../../api/axios';
import 'sweetalert2/dist/sweetalert2.min.css';
import ROUTER_PATHS from '../../utils/RouterPath';

/**
 * @param {Array} places
 * @returns {Promise<object>}
 */
export const savePreferencePlaces = async (places) => {
  try {
    const response = await instance.post('/members/interests/places', {
      places,
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || '선호 시설 저장 중 오류가 발생했습니다.';
    throw new Error(errorMessage);
  }
};

/**
 * @param {Array} regions
 * @returns {Promise<object>}
 * @param {Function} navigate
 */
export const savePreferenceRegions = async (regions, navigate) => {
  try {
    const response = await instance.post('/members/interests/regions', {
      regions,
    });
    navigate(ROUTER_PATHS.MAIN);

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || '선호 지역 저장 중 오류가 발생했습니다.';
    throw new Error(errorMessage);
  }
};
