import PropTypes from 'prop-types';

/* 
  사용 예시
  <Button styleType="primary" size="medium" label="Primary Button" />
*/

export const Button = ({
  styleType = 'main', // 기본값: 'primary'
  using = 'md', // 기본값: medium 크기
  label, // 필수값: 버튼에 표시할 텍스트
  ...props // 나머지 props 전달
}) => {
  // 공통 스타일 클래스
  const baseClasses = `inline-block cursor-pointer font-bold leading-none font-sans rounded-[8px]`;

  // 스타일 타입별 클래스
  const styleClasses = {
    main: `bg-[#3288FF] text-white`, // main 버튼 스타일
    reverseMain: `bg-white text-[#3288FF] border border-[#3288FF]`, // main 버튼 스타일의 반전 스타일
    nonClick: `bg-white text-[#8A8A8A] border border-[#8A8A8A]`, // 클릭되지 않은 버튼 스타일일
  };

  // size에 따라 Tailwind 클래스 정의
  const usingClasses = {
    xs: `px-4 py-2 text-sm w-[400px]`, // ex) 카테고리 버튼 사이즈
    sm: `px-4 py-2 text-sm w-[400px]`, // ex) 검색 페이지 시설 선택 버튼 사이즈
    md: `px-10 py-3 text-base w-[400px]`, // ex)
    lg: `px-6 py-4 text-lg w-[560px]`,
    xl: `px-6 py-4 text-lg w-[560px]`,
  };

  return (
    <button
      type="button"
      className={[
        baseClasses, // 공통 클래스
        styleClasses[styleType], // styleType에 따라 클래스 적용
        usingClasses[using], // size에 따른 클래스 적용
      ].join(' ')}
      {...props} // 나머지 props 전달
    >
      {label}
    </button>
  );
};

// PropTypes 정의
Button.propTypes = {
  styleType: PropTypes.oneOf(['main', 'reverseMain', 'nonClick']), // 스타일 타입 (primary, secondary, third 중 하나)
  using: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), // 버튼 크기
  label: PropTypes.string.isRequired, // 버튼 텍스트 (필수값)
  onClick: PropTypes.func, // 클릭 이벤트 핸들러
};
