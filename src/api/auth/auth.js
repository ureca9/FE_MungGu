import React, { useEffect } from 'react';
import { instance } from '../axios.js';
import Swal from 'sweetalert2';
import LOCAL_STORAGE_KEYS from '../../utils/LocalStorageKey';
import ROUTER_PATHS from '../../utils/RouterPath';
import { ERROR_MESSAGES } from '../../utils/ErrorMessage.js';
import { messaging } from "../../firebase";
import { getToken } from "firebase/messaging"; 

export const initializeFCM = async () => {
  // localStorage에서 초기화 상태 확인
  const isInitialized = localStorage.getItem('fcm_initialized') === 'true';
  
  if (isInitialized) {
    console.log("FCM already initialized");
    return;
  }

  if (!('serviceWorker' in navigator)) {
    console.log("Service Worker not supported");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log("Service Worker registered successfully");
    }
    
    localStorage.setItem('fcm_initialized', 'true');
  } catch (error) {
    console.error("Service Worker registration failed:", error);
  }
};

// FCM 토큰 등록 함수
export const registerFCMToken = async (memberId) => {
  if (!memberId) {
    console.error("Member ID is required");
    return;
  }


  try {
    const permission = await Notification.requestPermission();
    console.log("Permission result:", permission);

    if (permission !== 'granted') {
      if (permission === 'denied') {
        Swal.fire({
          icon: 'info',
          title: '푸시 알림 권한이 필요합니다',
          text: '푸시 알림을 받으려면 브라우저 설정에서 알림을 허용해 주세요.',
          confirmButtonText: '확인',
          confirmButtonColor: '#3288FF',
        });
      }
      return;
    }

    // 이전 토큰 확인
    const savedToken = localStorage.getItem(LOCAL_STORAGE_KEYS.FCM_TOKEN);
    

    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.FCM_VAPID_KEY
    });
    if (!currentToken) {
      console.warn('No FCM token received');
      return;
    }

    // 토큰이 같으면 재등록하지 않음
    if (savedToken === currentToken) {
      console.log("FCM token already registered");
      return;
    }

    // 새 토큰 등록
    await instance.post('/fcm/token', {
      memberId,
      token: currentToken
    });

    localStorage.setItem(LOCAL_STORAGE_KEYS.FCM_TOKEN, currentToken);
    console.log('FCM token registered successfully');

  } catch (error) {
    console.error('FCM token registration error:', error);
  }
}

// FCM 초기화 (중복 실행 방지)
const App = () => {
  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  }, []); 

  return React.createElement(RouterProvider, { router: router });
};

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

    // 이미 처리된 코드인지 확인
    const processedCode = localStorage.getItem('processedCode');
    if (processedCode === code) {
      console.log("This authorization code has already been processed.");
      return;
    }
    localStorage.setItem('processedCode', code);

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

      if (typeof hasMemberInfo !== 'boolean') {
        throw new Error('Invalid hasMemberInfo value received');
      }

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

      await registerFCMToken(memberId);

      if (typeof hasMemberInfo === 'boolean') {
        navigate(
          hasMemberInfo ? ROUTER_PATHS.MAIN : ROUTER_PATHS.USER_REGISTER,
        );
      } else {
        console.error('Invalid hasMemberInfo value');
        navigate(ROUTER_PATHS.USER_REGISTER);
      }
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
