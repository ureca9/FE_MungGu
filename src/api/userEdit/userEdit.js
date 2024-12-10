import { instance } from '../axios';
import Swal from 'sweetalert2';

/**
 * 사용자 상세 정보를 가져오는 API
 * @returns {Promise<Object>}
 */
export const fetchUserDetails = async () => {
  try {
    const response = await instance.get('/members/detail', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '데이터 불러오기 실패',
      text: '사용자 정보를 가져오는 중 오류가 발생했습니다.',
      confirmButtonColor: '#3288FF',
    });
    console.error(error);
    throw error;
  }
};

/**
 * 사용자 정보를 수정하는 API
 * @param {File|null} profileImage
 * @param {Object} memberInfo
 * @returns {Promise<Object>}
 */
export const updateUserDetails = async (profileImage, memberInfo) => {
  const formData = new FormData();

  formData.append(
    'UpdateMyPageRequestDto',
    new Blob([JSON.stringify(memberInfo)], { type: 'application/json' }),
  );

  if (profileImage) {
    formData.append('ProfileImage', profileImage);
  }

  try {
    const response = await instance.patch('/members', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    Swal.fire({
      icon: 'success',
      title: '수정 완료',
      text: '회원 정보가 성공적으로 수정되었습니다.',
      confirmButtonColor: '#3288FF',
    });

    return response.data.data;
  } catch (error) {
    let errorMessage = '알 수 없는 오류가 발생했습니다.';
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = '입력하신 정보를 다시 확인해주세요.';
          break;
        case 401:
          errorMessage = '인증이 필요합니다. 다시 로그인해주세요.';
          break;
        case 500:
          errorMessage = '서버 오류가 발생했습니다.';
          break;
      }
    }
    Swal.fire({
      icon: 'error',
      title: '수정 실패',
      text: errorMessage,
      confirmButtonColor: '#3288FF',
    });
    console.error(error);
    throw error;
  }
};
