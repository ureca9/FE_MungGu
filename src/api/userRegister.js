import { instance } from './axios.js';
import Swal from 'sweetalert2';

/**
 * @param {File} profileImage - 업로드할 프로필 이미지 파일
 * @param {Object} memberInfo - 회원 정보 객체
 * @returns {Promise<Object>}
 */
export const registerUser = async (profileImage, memberInfo) => {
  try {
    const formData = new FormData();

    formData.append(
      'MemberInfoDto',
      new Blob([JSON.stringify(memberInfo)], { type: 'application/json' }),
    );

    if (profileImage) {
      formData.append('ProfileImage', profileImage);
    }
    const token = localStorage.getItem('ACCESS_TOKEN');

    const response = await instance.post('/members/info', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
      },
    });

    if (response.status === 200 && response.data.message === 'success') {
      Swal.fire({
        icon: 'success',
        title: '등록 성공',
        text: '회원가입이 완료되었습니다.',
        confirmButtonColor: '#3288FF',
      });
      return response.data;
    } else {
      throw new Error('서버로부터 알 수 없는 응답을 받았습니다.');
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
