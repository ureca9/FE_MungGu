import PropTypes from 'prop-types';

/* 
  <BasicInput label="이름" id="name" placeholder="이름을 입력하세요"/> 
*/

export const BasicInput = ({ label, placeholder, id, ...props }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 text-[15px] font-bold">
        {label}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className={`inline-block cursor-pointer leading-none rounded-[8px] w-full bg-white border border-[#8a8a8a] font-light px-3 py-3 text-sm`}
        {...props}
      />
    </div>
  );
};

BasicInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
};
