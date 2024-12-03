import { instance } from '../axios.js';
import Swal from 'sweetalert2';
import LOCAL_STORAGE_KEYS from '../../utils/LocalStorageKey';
import ROUTER_PATHS from '../../utils/RouterPath';

export const getAuthToken = async () => {
  return await instance.post('/auth/token');
};

/**
 * @param {string} code
 * @param {Function} setLogin
 * @param {Function} navigate
 */
export const fetchAccessToken = async (code, setLogin, navigate) => {
  try {
    const response = await instance.get(`/auth/callback/kakao?code=${code}`);
    const data = response.data;

    if (data.message === 'success') {
      const accessToken = response.headers['authorization'];

      const { memberId, email, nickname, newMember, profileImageUrl } =
        data.data;

      localStorage.setItem(LOCAL_STORAGE_KEYS.MEMBER_ID, memberId);
      localStorage.setItem(LOCAL_STORAGE_KEYS.EMAIL, email);
      localStorage.setItem(LOCAL_STORAGE_KEYS.NICKNAME, nickname);
      localStorage.setItem(LOCAL_STORAGE_KEYS.NEW_MEMBER, newMember);
      localStorage.setItem(LOCAL_STORAGE_KEYS.PROFILE_IMAGE, profileImageUrl);

      setLogin(accessToken);

      navigate(newMember ? ROUTER_PATHS.USER_REGISTER : ROUTER_PATHS.MAIN);
    } else {
      console.error('Response error:', data);

      Swal.fire({
        icon: 'error',
        title: '로그인 실패',
        text: '로그인 중 문제가 발생했습니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#3288FF',
      });
    }
  } catch (error) {
    console.error('Backend communication error:', error);

    Swal.fire({
      icon: 'error',
      title: '통신 오류',
      text: '서버와의 통신 중 오류가 발생했습니다.',
      confirmButtonText: '확인',
      confirmButtonColor: '#3288FF',
    });
  }
};
