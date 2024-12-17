import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAccessToken } from '../api/auth/auth.js';
import useLoginStore from '../stores/Auth/useLoginStore';
import LoadingSpinner from './../components/common/LoadingSpinner';
import Swal from 'sweetalert2';
import ROUTER_PATHS from '../utils/RouterPath.js';
import loginImage from '../assets/login/LoginImgSprite.png';

const Login = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const navigate = useNavigate();
  const { isLoggedIn, setLogin } = useLoginStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}`;
    window.location.href = kakaoAuthUrl;
    console.log(kakaoAuthUrl);
  };
  console.log(REDIRECT_URI);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      const handleAuth = async () => {
        try {
          setIsLoading(true);
          if (code.length < 10) throw new Error('유효하지 않은 인증 코드');
          await fetchAccessToken(code, setLogin, navigate);
        } catch (error) {
          console.error('인증 실패:', error);
          Swal.fire({
            title: '로그인 실패',
            text: '다시 시도해주세요',
            icon: 'error',
            confirmButtonColor: '#3288FF',
          });
          navigate(ROUTER_PATHS.LOGIN);
        } finally {
          setIsLoading(false);
        }
      };
      handleAuth();
    }
  }, [isLoggedIn, navigate, setLogin]);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center px-6 mt-8">
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
          backgroundImage: `url(${loginImage})`,
          backgroundPosition: '-10px -10px',
        }}
      ></div>
      <div className="flex items-center w-2/3 gap-4 my-4 md:w-1/2">
        <div className="w-full h-[1px] border-[1px] border-[#8a8a8a]"></div>
        <div className="w-full text-sm text-center text-gray-600 whitespace-nowrap">
          SNS 계정으로 로그인
        </div>
        <div className="w-full h-[1px] border-[1px] border-[#8a8a8a]"></div>
      </div>
      <div className="flex flex-col justify-center w-2/3 mt-4 text-center md:w-1/2">
        <button
          className="bg-[#FEE500] text-[#371D1E] text-sm px-4 whitespace-nowrap rounded-[8px] w-full font-bold rounded-lg py-2 flex justify-center items-center"
          onClick={handleKakaoLogin}
        >
          <div
            className="w-6 h-6 mr-2"
            style={{
              backgroundImage: `url(${loginImage})`,
              backgroundPosition: '-230px -10px',
            }}
          ></div>
          카카오로 로그인하기
        </button>
        <button
          className="mt-4 text-sm text-gray-400"
          onClick={() => navigate(ROUTER_PATHS.MAIN)}
        >
          건너뛰기
        </button>
      </div>
    </div>
  );
};

export default Login;
