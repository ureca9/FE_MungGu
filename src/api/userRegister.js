import { instance } from './axios.js';
import Swal from 'sweetalert2';

/**
 * @param {FormData} formData
 * @returns {Promise<Object>}
 */
export const registerUser = async (formData) => {
  try {
    const response = await instance.post('/members/info', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: '등록 성공',
        text: '회원가입이 완료되었습니다.',
        confirmButtonColor: '#3288FF',
      });
      return response.data;
    }
  } catch (error) {
    console.error('Error during registration:', error);
    Swal.fire({
      icon: 'error',
      title: '등록 실패',
      text: '회원가입 중 문제가 발생했습니다.',
      confirmButtonColor: '#3288FF',
    });
    throw error;
  }
};
