import PropTypes from 'prop-types';

/* 
  사용 예시
  import { CRUDBtn } from '/경로';
  <CRUDBtn styleType="blue" type="xs" label="확인" onClick={}/>
*/

export const CRUDBtn = ({
  styleType = 'blue', // 기본값: 'primary'
  size = 'md', // 기본값: medium 크기
  label, // 필수값: 버튼에 표시할 텍스트
  ...props // 나머지 props 전달
}) => {
  // 공통 스타일 클래스
  const baseClasses = `inline-block cursor-pointer leading-none rounded-[8px]`;

  // 스타일 타입별 클래스
  const styleClasses = {
    blue: `bg-[#3288FF] text-white hover:bg-blue-600`, // main 버튼 스타일
    reverseBlue: `bg-white text-[#3288FF] border border-[#3288FF]`, // main 버튼 스타일의 반전 스타일
    black: `bg-[#000000] text-[#ffffff] hover:bg-gray-600`, // 검정 버튼 스타일
  };

  // size에 따라 Tailwind 클래스 정의
  // 여기서 높이랑 텍스트 굵기, 텍스트사이즈
  const sizeClasses = {
    xs: `py-2 text-xs w-16`, // ex) 카테고리 버튼 사이즈
    sm: `py-2 text-sm w-20 font-bold`, // ex) 검색 페이지 시설 선택 버튼 사이즈
    md: `py-3 text-base w-24 font-bold`, // ex)
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
CRUDBtn.propTypes = {
  styleType: PropTypes.oneOf(['blue', 'reverseBlue', 'black']), // 스타일 타입 (blue, reverseBlue, blacky 중 하나)
  size: PropTypes.oneOf(['xs', 'sm', 'md']), // 버튼 크기
  label: PropTypes.string.isRequired, // 버튼 텍스트 (필수값)
  onClick: PropTypes.func, // 클릭 이벤트 핸들러
};
