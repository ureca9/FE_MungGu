import PropTypes from 'prop-types';

/* 
  <BasicInput 
    label="이름" 
    id="name" 
    type="text" 
    placeholder="이름을 입력하세요" 
    style="gray" 
  /> 
*/

export const BasicInput = ({
  label,
  placeholder = '여기에 적어주세요.',
  id,
  type = 'text',
  style = 'gray',
  ...props
}) => {
  const styleClass = {
    gray: 'bg-gray-100 border-gray-300 text-gray-700 text-sm',
    blue: 'bg-[#3288FF] text-white text-base',
  };

  const selectedClass = styleClass[style] || styleClass.gray;

  return (
    <div className="flex flex-col">
      {type !== 'submit' && (
        <label htmlFor={id} className="mb-1 text-[15px] font-bold">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`inline-block leading-none rounded-[8px] w-full border font-light px-3 py-3 ${selectedClass}`}
        {...props}
      />
    </div>
  );
};

BasicInput.propTypes = {
  label: PropTypes.string.isRequired, // label은 필수
  placeholder: PropTypes.string, // 기본값으로 빈 문자열
  id: PropTypes.string.isRequired, // id는 필수
  type: PropTypes.oneOf(['radio', 'email', 'text', 'file', 'submit']), // 허용된 타입
  style: PropTypes.oneOf(['gray', 'blue']), // gray와 blue 디자인 옵션
};
