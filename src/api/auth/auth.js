import { instance } from '../axios.js';
import Swal from 'sweetalert2';
import LOCAL_STORAGE_KEYS from '../../utils/LocalStorageKey';
import ROUTER_PATHS from '../../utils/RouterPath';
import { ERROR_MESSAGES } from '../../utils/ErrorMessage.js';

export const getAuthToken = async () => {
  try {
    const response = await instance.post('/auth/token');
    return response;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    Swal.fire({
      icon: 'error',
      title: '세션 만료',
      text: '로그인이 만료되었습니다. 다시 로그인해 주세요.',
      confirmButtonText: '확인',
      confirmButtonColor: '#3288FF',
    });
    throw error;
  }
};

/**
 * @param {string} code
 * @param {Function} setLogin
 * @param {Function} navigate
 */
export const fetchAccessToken = async (code, setLogin, navigate) => {
  try {
    if (!code || typeof code !== 'string') {
      throw new Error('Invalid authorization code');
    }
    const response = await instance.get(`/auth/callback/kakao?code=${code}`);
    const data = response.data;

    if (data.message === 'success') {
      const accessToken = response.headers['authorization'];

      const {
        memberId,
        email,
        nickname,
        newMember,
        profileImageUrl,
        hasMemberInfo,
      } = data.data;

      if (!accessToken || typeof accessToken !== 'string') {
        throw new Error('Invalid access token received');
      }
      const updateLocalStorage = (keysAndValues) => {
        Object.keys(keysAndValues).forEach((key) => {
          localStorage.removeItem(key);
        });
        Object.entries(keysAndValues).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
      };

      const keysAndValues = {
        [LOCAL_STORAGE_KEYS.MEMBER_ID]: memberId,
        [LOCAL_STORAGE_KEYS.EMAIL]: email,
        [LOCAL_STORAGE_KEYS.NICKNAME]: nickname,
        [LOCAL_STORAGE_KEYS.NEW_MEMBER]: newMember,
        [LOCAL_STORAGE_KEYS.PROFILE_IMAGE]: profileImageUrl,
        [LOCAL_STORAGE_KEYS.HAS_MEMBER_INFO]: hasMemberInfo,
      };

      updateLocalStorage(keysAndValues);
      setLogin(accessToken);

      navigate(hasMemberInfo ? ROUTER_PATHS.MAIN : ROUTER_PATHS.USER_REGISTER);
    } else {
      console.error('Response error:', data);

      Swal.fire({
        icon: 'error',
        title: ERROR_MESSAGES.LOGIN_FAILED_TITLE,
        text: ERROR_MESSAGES.LOGIN_FAILED_MESSAGE,
        confirmButtonText: '확인',
        confirmButtonColor: '#3288FF',
      });
    }
  } catch (error) {
    console.error('Backend communication error:', error);

    Swal.fire({
      icon: 'error',
      title: ERROR_MESSAGES.COMMUNICATION_ERROR_TITLE,
      text: ERROR_MESSAGES.COMMUNICATION_ERROR_MESSAGE,
      confirmButtonText: '확인',
      confirmButtonColor: '#3288FF',
    });
  }
};
