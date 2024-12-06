import Swal from 'sweetalert2';
import { instance } from '../../api/axios';
import ROUTER_PATHS from '../../utils/RouterPath';
import 'sweetalert2/dist/sweetalert2.min.css';

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
 */
export const savePreferenceRegions = async (regions) => {
  try {
    const response = await instance.post('/members/interests/regions', {
      regions,
    });

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || '선호 지역 저장 중 오류가 발생했습니다.';
    throw new Error(errorMessage);
  }
};

/**
 * @param {Array} selectedRegions
 * @param {Function} navigate
 */
export const handleSubmitRegions = async (selectedRegions, navigate) => {
  if (selectedRegions.length !== 2) {
    Swal.fire({
      text: '2개의 지역을 선택해주세요.',
      icon: 'warning',
      confirmButtonText: '확인',
      confirmButtonColor: '#3288FF',
    });
    return;
  }

  try {
    await savePreferenceRegions(selectedRegions);
    navigate(ROUTER_PATHS.MAIN);
  } catch (error) {
    console.error(error);
    Swal.fire({
      text: error.message || '선호 지역 저장 중 오류가 발생했습니다.',
      icon: 'error',
      confirmButtonText: '확인',
      confirmButtonColor: '#3288FF',
    });
  }
};
