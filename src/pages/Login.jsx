import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginBtn } from '../stories/Buttons/LoginBtn/LoginBtn';
import { instance } from './../api/axios';

const Login = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = 'http://localhost:5173/login';
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}`;
    window.location.href = kakaoAuthUrl; // Kakao 로그인 페이지로 리다이렉트
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      fetchAccessToken(code); // code를 이용해 액세스 토큰 요청
    }
  }, []);

  const fetchAccessToken = async (code) => {
    try {
      const response = await instance.get(`/auth/callback/kakao?code=${code}`);

      const data = response.data;

      if (data.message === 'success') {
        const { email, nickname, NewMember } = data.data;
        console.log('사용자 정보:', { email, nickname, NewMember });
        alert(`환영합니다, ${nickname}님!`);

        navigate('/');
      } else {
        console.error('응답 오류:', data);
        alert('로그인 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('백엔드 통신 에러:', error);
      alert('서버와의 통신 중 오류가 발생했습니다.');
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
        <div className="w-full text-base font-bold text-center text-gray-600">
          소셜로그인
        </div>
        <div className="w-full h-[1px] border-[1px] border-[#8a8a8a]"></div>
      </div>
      <div className="w-2/3 mt-2 space-y-4">
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
