import { CgMathPlus } from 'react-icons/cg';
import { FaCamera } from 'react-icons/fa';

const FileData = () => {
  return (
    <div>
      <div className="flex items-center h-auto gap-5">
        <div>
          <label>
            <input
              type="file"
              // onChange={handleFileChange}
              className="hidden peer"
            />
            <div className="w-28 h-28 bg-[#EBF4FF] flex rounded-lg items-center border border-[#3288FF] justify-center text-[#3288FF] text-6xl">
              <CgMathPlus />
            </div>
          </label>
        </div>
        <div className="w-28 h-28 bg-[#D9D9D9] flex rounded-lg items-center justify-center ">
          <div className="text-[#8A8A8A] text-4xl flex">
            <FaCamera />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileData;
