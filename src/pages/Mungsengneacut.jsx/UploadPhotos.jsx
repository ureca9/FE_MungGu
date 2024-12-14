import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import html2canvas from 'html2canvas';
import Frame1White from '../../assets/mungsengneacut/FrameDesign/Frame1-white.svg';
import Frame1Black from '../../assets/mungsengneacut/FrameDesign/Frame1-black.svg';
import Frame1Sky from '../../assets/mungsengneacut/FrameDesign/Frame1-sky.svg';
import Frame1Christmas from '../../assets/mungsengneacut/FrameDesign/Frame1-christmas.svg';
import Frame2White from '../../assets/mungsengneacut/FrameDesign/Frame2-white.svg';
import Frame2Black from '../../assets/mungsengneacut/FrameDesign/Frame2-black.svg';
import Frame2Sky from '../../assets/mungsengneacut/FrameDesign/Frame2-sky.svg';
import Frame2Christmas from '../../assets/mungsengneacut/FrameDesign/Frame2-christmas.svg';
import Frame3White from '../../assets/mungsengneacut/FrameDesign/Frame3-white.svg';
import Frame3Black from '../../assets/mungsengneacut/FrameDesign/Frame3-black.svg';
import Frame3Sky from '../../assets/mungsengneacut/FrameDesign/Frame3-sky.svg';
import Frame3Christmas from '../../assets/mungsengneacut/FrameDesign/Frame3-christmas.svg';
import { BasicBtn } from '../../stories/Buttons/BasicBtn/BasicBtn';

const frameImages = {
  Frame1: {
    white: Frame1White,
    black: Frame1Black,
    sky: Frame1Sky,
    christmas: Frame1Christmas,
  },
  Frame2: {
    white: Frame2White,
    black: Frame2Black,
    sky: Frame2Sky,
    christmas: Frame2Christmas,
  },
  Frame3: {
    white: Frame3White,
    black: Frame3Black,
    sky: Frame3Sky,
    christmas: Frame3Christmas,
  },
};

const UploadPhotos = () => {
  const location = useLocation();
  const selectedFrame = location.state?.frame || 'Frame1';
  const [images, setImages] = useState([null, null, null, null]);
  const [frameImage, setFrameImage] = useState(
    frameImages[selectedFrame].white,
  );

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
        e.target.value = ''; // Reset input value to allow re-upload
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = async () => {
    const element = document.getElementById('frame');
    const canvas = await html2canvas(element);
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = '멍생네컷.png';
    link.click();
  };

  const handleFrameColorChange = (color) => {
    setFrameImage(frameImages[selectedFrame][color]);
  };

  const isNextButtonDisabled = images.some((image) => image === null);

  return (
    <div className="flex flex-col items-center">
      <div className="px-10 mt-5 text-lg text-center">
        프레임 디자인 선택 후, <b className="text-[#3288ff]">사진을 업로드</b>
        해주세요!
      </div>
      <div className="flex items-center gap-4 mt-8">
        {Object.keys(frameImages[selectedFrame]).map((color) => (
          <img
            key={color}
            src={frameImages[selectedFrame][color]}
            alt={`${selectedFrame}-${color}`}
            className="w-[40px] h-[40px] rounded-full cursor-pointer object-cover border"
            onClick={() => handleFrameColorChange(color)}
          />
        ))}
      </div>
      <div className="relative w-1/2 mt-6">
        <div className="relative block" id="frame">
          <img
            src={frameImage}
            alt="Selected frame"
            className="w-1/2 max-w-full mx-auto"
          />
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute ${
                index === 0
                  ? 'top-[6%] left-[29%]'
                  : index === 1
                    ? 'top-[29%] left-[29%]'
                    : index === 2
                      ? 'top-[52%] left-[29%]'
                      : 'top-[75%] left-[29%]'
              } w-[42.5%] h-[22%] flex justify-center items-center border bg-white`}
            >
              {image ? (
                <img
                  src={image}
                  alt={`Uploaded ${index}`}
                  className="object-cover w-full h-full"
                />
              ) : (
                <label
                  htmlFor={`file-upload-${index}`}
                  className="w-full h-full flex justify-center items-center text-[#8a8a8a] cursor-pointer"
                >
                  이미지 업로드
                </label>
              )}
              <input
                id={`file-upload-${index}`}
                type="file"
                className="hidden"
                onChange={(e) => handleImageUpload(e, index)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-4/5 px-10 mt-12 mb-16">
        <BasicBtn
          styleType={`${isNextButtonDisabled ? 'gray' : 'blue'}`}
          size="md"
          label="다음"
          type="submit"
          onClick={handleCapture}
          disabled={isNextButtonDisabled}
        />
      </div>
    </div>
  );
};

export default UploadPhotos;
