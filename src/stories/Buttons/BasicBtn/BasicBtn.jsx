import PropTypes from 'prop-types';

/* 
  import { BasicBtn } from '/경로';
  <BasicBtn styleType="blue" size="md" label="예시" onClick={(선택)}/>
*/

export const BasicBtn = ({
  styleType = 'blue',
  size = 'lg',
  label,
  ...props
}) => {
  const baseClasses = `inline-block cursor-pointer leading-none rounded-[8px] w-full`;

  const styleClasses = {
    blue: `bg-[#3288FF] text-white font-bold hover:bg-blue-600`,
    reverseBlue: `bg-white text-[#3288FF] border-2 border-[#3288FF] font-bold`,
    black: `bg-[#000000] text-[#ffffff] font-bold hover:bg-gray-600`,
    reverseBlack: `bg-[#ffffff] text-[#000000] border border-[#8A8A8A] font-bold`,
    gray: `bg-gray-300 text-white font-bold`,
    reverseGray: `bg-white text-[#8a8a8a] border border-[#8a8a8a] font-light`,
  };

  const sizeClasses = {
    xs: 'py-1 text-xs',
    sm: `py-2 text-sm `,
    md: `py-3 text-base`,
    lg: `py-4 text-lg`,
    xl: `py-5 text-lg`,
  };

  return (
    <button
      type="button"
      className={[baseClasses, styleClasses[styleType], sizeClasses[size]].join(
        ' ',
      )}
      {...props}
    >
      {label}
    </button>
  );
};

BasicBtn.propTypes = {
  styleType: PropTypes.oneOf([
    'blue',
    'reverseBlue',
    'black',
    'reverseBlack',
    'gray',
    'reverseGray',
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
