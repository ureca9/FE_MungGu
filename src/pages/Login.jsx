import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginBtn } from '../stories/Buttons/LoginBtn/LoginBtn';
import { fetchAccessToken } from '../api/auth/auth.js';
import useLoginStore from '../stores/Auth/useLoginStore';

const Login = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const navigate = useNavigate();
  const { isLoggedIn, setLogin } = useLoginStore();

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}`;
    window.location.href = kakaoAuthUrl;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      fetchAccessToken(code, setLogin, navigate);
    }
  }, [isLoggedIn, navigate, setLogin]);

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
        <LoginBtn styleType="kakao" onClick={handleKakaoLogin} />
        <LoginBtn styleType="google" />
        <LoginBtn styleType="naver" />
      </div>
    </div>
  );
};

export default Login;
