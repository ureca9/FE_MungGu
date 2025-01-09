import { instance } from '../axios.js';
import Swal from 'sweetalert2';

/**
 * @param {File} profileImage
 * @param {Object} memberInfo
 * @returns {Promise<Object>}
 */
export const registerUser = async (profileImage, memberInfo) => {
  try {
    if (!memberInfo?.name?.trim() || !memberInfo?.nickname?.trim()) {
      throw new Error('필수 정보가 누락되었습니다.');
    }
    const formData = new FormData();

    formData.append(
      'MemberInfoDto',
      new Blob([JSON.stringify(memberInfo)], { type: 'application/json' }),
    );

    if (profileImage) {
      formData.append('ProfileImage', profileImage);
    }
    const response = await instance.post('/members/info', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      if (response.data.message === 'success') {
        Swal.fire({
          icon: 'success',
          title: '등록 성공',
          text: '회원가입이 완료되었습니다.',
          confirmButtonColor: '#3288FF',
        });
        return response.data;
      } else {
        throw new Error(
          response.data.message || '서버 처리 중 오류가 발생했습니다.',
        );
      }
    } else {
      throw new Error(`서버 오류: ${response.status}`);
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
