import { useState } from 'react';
import { BasicBtn } from './../../stories/Buttons/BasicBtn/BasicBtn';
import Frame1 from '../../assets/mungsengneacut/Frame1.svg';
import Frame2 from '../../assets/mungsengneacut/Frame2.svg';
import Frame3 from '../../assets/mungsengneacut/Frame3.svg';
import { useNavigate } from 'react-router-dom';
import ROUTER_PATHS from '../../utils/RouterPath';
import { FaCheck } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ChooseFrame = () => {
  const [selectedFrame, setSelectedFrame] = useState(null);
  const navigate = useNavigate();

  const moveUploadPhotos = () => {
    if (selectedFrame) {
      navigate(ROUTER_PATHS.UPLOAD_PHOTOS, { state: { frame: selectedFrame } });
    } else {
      Swal.fire({
        icon: 'warning',
        title: '프레임을 선택해주세요!',
        confirmButtonText: '확인',
        confirmButtonColor: '#3288FF',
      });
    }
  };

  const handleFrameClick = (frame) => {
    setSelectedFrame((prevFrame) => (prevFrame === frame ? null : frame));
  };

  const renderFrame = (frameKey, frameSrc) => (
    <div
      className="relative cursor-pointer"
      onClick={() => handleFrameClick(frameKey)}
    >
      <img src={frameSrc} alt={`멍생네컷 프레임 ${frameKey}`} />
      {selectedFrame === frameKey && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <FaCheck size={40} className="text-white" />
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="px-10 mt-5 text-lg text-center">
        원하는 <b className="text-[#3288ff]">프레임을 선택</b>해주세요!
      </div>
      <div className="flex flex-col items-center justify-center gap-8 my-16 md:flex-row">
        {renderFrame('Frame1', Frame1)}
        {renderFrame('Frame2', Frame2)}
        {renderFrame('Frame3', Frame3)}
      </div>
      <div className="w-4/5 mx-auto mt-12 mb-16">
        <BasicBtn
          styleType="blue"
          size="md"
          label="다음"
          type="submit"
          onClick={moveUploadPhotos}
        />
      </div>
    </>
  );
};

export default ChooseFrame;
