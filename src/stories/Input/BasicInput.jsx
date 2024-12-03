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
  children,
  ...props
}) => {
  const styleClass = {
    gray: 'bg-white border-gray-300 text-gray-700 text-sm',
    blue: 'bg-[#3288FF] text-white text-base',
    disabled: 'bg-[#F5F5F5] border border-[#8a8a8a] text-sm text-[#8a8a8a]',
  };

  const selectedClass = styleClass[style] || styleClass.gray;

  return (
    <div className="relative flex flex-col w-full mt-5 mb-1">
      {type !== 'submit' && (
        <label htmlFor={id} className="mb-1 text-[15px] font-bold">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={`w-full inline-block leading-none rounded-[8px] border font-light px-3 py-3 pr-20 ${selectedClass}`}
          {...props}
        />
        {children && (
          <div className="absolute transform -translate-y-1/2 right-3 top-1/2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

BasicInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['radio', 'email', 'text', 'file', 'submit']),
  style: PropTypes.oneOf(['gray', 'blue', 'disabled']),
  children: PropTypes.node,
};
