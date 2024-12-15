import PropTypes from 'prop-types';
import kakaoIcon from '../../../assets/login/LoginImgSprite.png';

export const LoginBtn = ({ styleType = 'kakao', label = '', ...props }) => {
  const baseClasses =
    'inline-flex items-center justify-center cursor-pointer leading-none rounded-[8px] w-full font-bold rounded-lg py-2';

  const styleClasses = {
    kakao: 'bg-[#FEE500] text-[#371D1E] text-sm px-4 whitespace-nowrap',
  };
  console.log(kakaoIcon);

  const iconStyles = {
    kakao: {
      backgroundImage: `url(${kakaoIcon})`,
      backgroundPosition: '-230px -10px',
    },
  };

  return (
    <button
      type="button"
      className={`${baseClasses} ${styleClasses[styleType]}`}
      {...props}
    >
      <span
        className="block w-6 h-6 mr-2 bg-no-repeat bg-contain"
        style={iconStyles[styleType]}
      ></span>
      {label}
    </button>
  );
};

LoginBtn.propTypes = {
  styleType: PropTypes.oneOf(['kakao']),
  label: PropTypes.string,
  onClick: PropTypes.func,
};
