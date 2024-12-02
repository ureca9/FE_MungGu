import PropTypes from 'prop-types';

/* 
  import { CRUDBtn } from '/경로';
  <CRUDBtn styleType="blue" type="xs" label="확인" onClick={}/>
*/

export const CRUDBtn = ({
  styleType = 'blue',
  size = 'md',
  label,
  ...props
}) => {
  const baseClasses = `inline-block cursor-pointer leading-none rounded-[8px]`;

  const styleClasses = {
    blue: `bg-[#3288FF] text-white hover:bg-blue-600`,
    reverseBlue: `bg-white text-[#3288FF] border border-[#3288FF]`,
    black: `bg-[#000000] text-[#ffffff] hover:bg-gray-600`,
  };

  const sizeClasses = {
    xs: `py-2 text-xs w-16`,
    sm: `py-2 text-sm w-20 font-bold`,
    md: `py-3 text-base w-24 font-bold`,
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

CRUDBtn.propTypes = {
  styleType: PropTypes.oneOf(['blue', 'reverseBlue', 'black']),
  size: PropTypes.oneOf(['xs', 'sm', 'md']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
