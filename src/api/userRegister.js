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
    if (!token) {
      throw new Error('인증 토큰이 없습니다.');
    }
    const response = await instance.post('/members/info', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
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
