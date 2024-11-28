import PropTypes from 'prop-types';

/* 
  사용 예시
  import { LoginBtn } from '/경로';
  <LoginBtn styleType="kakao" label="카카오로 로그인하기" iconSrc="/경로" onClick={}/>
*/

export const LoginBtn = ({
  styleType = 'kakao', // 기본값: 'kakao'
  label = '카카오로 로그인하기', // 버튼 텍스트
  ...props // 나머지 props 전달
}) => {
  // 공통 스타일 클래스
  const baseClasses =
    'inline-flex items-center justify-center cursor-pointer leading-none rounded-[8px] w-full h-12 font-bold';

  // 스타일 타입별 클래스
  const styleClasses = {
    kakao: 'bg-[#FEE500] text-[#371D1E]',
    google: 'bg-[#ffffff] text-[#000000] border border-[#8A8A8A]',
    naver: 'bg-[#00C73C] text-[#FFFFFF]',
  };

  // 아이콘 스타일 타입별 클래스
  const iconClasses = {
    kakao: 'bg-kakaoIcon',
    google: 'bg-googleIcon',
    naver: 'bg-naverIcon',
  };

  return (
    <button
      type="button"
      className={`${baseClasses} ${styleClasses[styleType]}`}
      {...props}
    >
      <span className={`${iconClasses[styleType]} mr-2`}></span>
      {label}
    </button>
  );
};

LoginBtn.propTypes = {
  styleType: PropTypes.oneOf(['kakao', 'google', 'naver']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
