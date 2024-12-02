import PropTypes from 'prop-types';

export const LoginBtn = ({ styleType = 'kakao', ...props }) => {
  const baseClasses =
    'inline-flex items-center justify-center cursor-pointer leading-none rounded-[8px] w-[52px] h-[52px] font-bold rounded-full';

  const styleClasses = {
    kakao: 'bg-[#FEE500] ',
    google: 'bg-[#ffffff] border border-[#8A8A8A]',
    naver: 'bg-[#00C73C] ',
  };

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
      <span className={`${iconClasses[styleType]}`}></span>
    </button>
  );
};

LoginBtn.propTypes = {
  styleType: PropTypes.oneOf(['kakao', 'google', 'naver']),
  onClick: PropTypes.func,
};
