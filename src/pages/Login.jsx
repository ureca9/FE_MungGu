import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LoginBtn } from '../stories/Buttons/LoginBtn/LoginBtn';
import { instance } from './../api/axios';
import ROUTER_PATHS from '../utils/RouterPath';
import useLoginStore from '../stores/login';
import LOCAL_STORAGE_KEYS from '../utils/LocalStorageKey';

const Login = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const navigate = useNavigate();
  const { setLogin } = useLoginStore();

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}`;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      fetchAccessToken(code);
    }
  }, []);

  const fetchAccessToken = async (code) => {
    try {
      const response = await instance.get(`/auth/callback/kakao?code=${code}`);
      const data = response.data;

      if (data.message === 'success') {
        const { memberId, email, nickname, newMember } = data.data;
        localStorage.setItem(LOCAL_STORAGE_KEYS.MEMBER_ID, memberId);
        localStorage.setItem(LOCAL_STORAGE_KEYS.EMAIL, email);
        localStorage.setItem(LOCAL_STORAGE_KEYS.NICKNAME, nickname);
        localStorage.setItem(LOCAL_STORAGE_KEYS.NEW_MEMBER, newMember);

        setLogin();

        navigate(newMember ? ROUTER_PATHS.USER_REGISTER : ROUTER_PATHS.MAIN);
      } else {
        console.error('응답 오류:', data);

        Swal.fire({
          icon: 'error',
          title: '로그인 실패',
          text: '로그인 중 문제가 발생했습니다.',
          confirmButtonText: '확인',
          confirmButtonColor: '#3288FF',
        });
      }
    } catch (error) {
      console.error('백엔드 통신 에러:', error);

      Swal.fire({
        icon: 'error',
        title: '통신 오류',
        text: '서버와의 통신 중 오류가 발생했습니다.',
        confirmButtonText: '확인',
        confirmButtonColor: '#3288FF',
      });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-6 mt-8">
      <span className="mb-4 text-lg text-gray-600">
        우리 댕댕이와{' '}
        <span className="font-bold text-[#3288FF]">함께 하는 활동!</span>
      </span>
      <div className="mb-8 text-3xl LogoFont font-extrabold text-[#3288FF]">
        멍티비티
      </div>
      <div
        className="mb-4 w-[200px] h-[243px]"
        style={{
          backgroundImage: "url('src/assets/login/LoginImgSprite.png')",
          backgroundPosition: '-10px -10px',
        }}
      ></div>
      <div className="flex items-center w-2/3 gap-4 my-4">
        <div className="w-full h-[1px] border-[1px] border-[#8a8a8a]"></div>
        <div className="w-full text-sm text-center text-gray-600">
          SNS 계정으로 로그인
        </div>
        <div className="w-full h-[1px] border-[1px] border-[#8a8a8a]"></div>
      </div>
      <div className="flex justify-between w-[200px] mt-4 text-center">
        <LoginBtn
          styleType="kakao"
          label="카카오로 시작하기"
          onClick={handleKakaoLogin}
        />
        <LoginBtn styleType="google" label="Google로 시작하기" />
        <LoginBtn styleType="naver" label="네이버로 시작하기" />
      </div>
    </div>
  );
};

export default Login;
