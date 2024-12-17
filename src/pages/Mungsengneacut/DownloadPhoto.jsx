import { useLocation, useNavigate } from 'react-router-dom';
import ROUTER_PATHS from '../../utils/RouterPath';

const DownloadPhoto = () => {
  const location = useLocation();
  const { imageUrl, imageDownloadUrl } = location.state || {};
  const navigate = useNavigate();
  const MungsengneacutHome = () => {
    navigate(ROUTER_PATHS.MUNGSENGNEACUT);
  };
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageDownloadUrl;
    link.download = '멍생네컷.png';
    link.click();
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-2xl font-bold"></h1>
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt="Uploaded Photo"
            className="w-3/4 h-auto mb-4 md:w-1/2"
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleDownload}
              className="w-[140px] py-2 text-white bg-blue-500 rounded-lg "
            >
              사진 다운로드
            </button>
            <button
              onClick={MungsengneacutHome}
              className="w-[140px] py-2 rounded-lg border-2 border-[#3288ff] text-[#3288ff]"
            >
              멍생네컷 홈으로
            </button>
          </div>
        </>
      ) : (
        <p>다운로드할 이미지가 없습니다.</p>
      )}
    </div>
  );
};

export default DownloadPhoto;
