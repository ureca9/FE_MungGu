import PropTypes from 'prop-types';

/* 
  사용 예시
  import { BasicBtn } from '/경로';
  <BasicBtn styleType="blue" size="md" label="예시" onClick={(선택)}/>
*/

export const BasicBtn = ({
  styleType = 'blue', // 기본값: 'primary'
  size = 'lg', // 기본값: medium 크기
  label, // 필수값: 버튼에 표시할 텍스트
  ...props // 나머지 props 전달
}) => {
  // 공통 스타일 클래스
  const baseClasses = `inline-block cursor-pointer leading-none rounded-[8px] w-full`;

  // 스타일 타입별 클래스
  const styleClasses = {
    blue: `bg-[#3288FF] text-white font-bold hover:bg-blue-600`, // main 버튼 스타일
    reverseBlue: `bg-white text-[#3288FF] border-2 border-[#3288FF] font-bold`, // main 버튼 스타일의 반전 스타일
    black: `bg-[#000000] text-[#ffffff] font-bold hover:bg-gray-600`, // 검정 버튼 스타일
    reverseBlack: `bg-[#ffffff] text-[#000000] border border-[#8A8A8A] font-bold`, // 검정 버튼 스타일의 반전 스타일
    gray: `bg-white text-[#8a8a8a] border border-[#8a8a8a] font-light`, // 카테고리 클릭되지 않았을때
  };

  // size에 따라 Tailwind 클래스 정의
  const sizeClasses = {
    xs: 'py-1 text-xs', // 목록페이지-카테고리
    sm: `py-2 text-sm `, // 메인페이지-카테고리
    md: `py-3 text-base`,
    lg: `py-4 text-lg`,
    xl: `py-5 text-lg`,
  };

  return (
    <button
      type="button"
      className={[
        baseClasses, // 공통 클래스
        styleClasses[styleType], // styleType에 따라 클래스 적용
        sizeClasses[size], // size에 따른 클래스 적용
      ].join(' ')}
      {...props} // 나머지 props 전달
    >
      {label}
    </button>
  );
};

// PropTypes 정의
BasicBtn.propTypes = {
  styleType: PropTypes.oneOf([
    'blue',
    'reverseBlue',
    'black',
    'reverseBlack',
    'gray',
  ]), // 스타일 타입 (blue, reverseBlue, black, reverseBlack,gray 중 하나)
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), // 버튼 크기
  label: PropTypes.string.isRequired, // 버튼 텍스트 (필수값)
  onClick: PropTypes.func, // 클릭 이벤트 핸들러
};
