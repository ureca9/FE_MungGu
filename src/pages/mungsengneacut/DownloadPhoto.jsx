import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ROUTER_PATHS from '../../utils/RouterPath';
import downloadBG from '../../assets/mungsengneacut/downloadBG.svg';
import downloadBgMobile from '../../assets/mungsengneacut/downloadBgMobile.svg';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { LuShare2 } from 'react-icons/lu';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { fetchDownloadUrl } from '../../api/mungsengneacut';

const DownloadPhoto = () => {
  const location = useLocation();
  const { capturedImage, selectedFrame } = location.state || {};
  const [imageDownloadUrl, setImageDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const navigate = useNavigate();
  const [currentBg, setCurrentBg] = useState(downloadBG);

  const MungsengneacutHome = () => {
    navigate(ROUTER_PATHS.MUNGSENGNEACUT);
  };

  useEffect(() => {
    const updateBackground = () => {
      if (window.innerWidth >= 768) {
        setCurrentBg(downloadBG);
      } else {
        setCurrentBg(downloadBgMobile);
      }
    };
    updateBackground();
    window.addEventListener('resize', updateBackground);
    return () => {
      window.removeEventListener('resize', updateBackground);
    };
  }, []);

  const handleDownload = async () => {
    if (!capturedImage) {
      Swal.fire({
        icon: 'error',
        title: '다운로드 실패',
        text: '다운로드할 이미지를 찾을 수 없습니다.',
        confirmButtonColor: '#3288FF',
      });
      return;
    }

    setLoading(true);
    try {
      let downloadUrl = imageDownloadUrl;

      if (!imageDownloadUrl) {
        const url = await fetchDownloadUrl(capturedImage);
        setImageDownloadUrl(url);
        downloadUrl = url;
      }

      if (downloadUrl) {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = '멍생네컷.png';
        link.click();
      } else {
        Swal.fire({
          icon: 'error',
          title: '다운로드 실패',
          text: '이미지를 가져오는 데 실패했습니다.',
          confirmButtonColor: '#3288FF',
        });
      }
    } catch (error) {
      console.error('이미지 다운로드 실패:', error);
      Swal.fire({
        icon: 'error',
        title: '다운로드 실패',
        text: '이미지 다운로드 중 오류가 발생했습니다.',
        confirmButtonColor: '#3288FF',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="relative">
        <div className="block">
          <img src={currentBg} alt="배경" className="max-w-full opacity-65" />
          {capturedImage ? (
            <div className="block absolute top-[10%] left-[10%] md:left-[23%] p-4 rounded-lg bg-white shadow-md w-4/5 md:w-1/2">
              <img
                src={imageDownloadUrl || capturedImage}
                alt="Captured Photo"
                className={`${
                  selectedFrame === 'Frame3' ? 'w-1/2' : 'w-full'
                } h-auto mb-4 mx-auto`}
              />

              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handleDownload}
                  className="w-[140px] py-2 text-white bg-blue-500 rounded-lg"
                  disabled={loading}
                >
                  {loading ? '처리 중...' : '사진 다운로드'}
                </button>
                <button
                  onClick={MungsengneacutHome}
                  className="w-[140px] py-2 rounded-lg border-2 border-[#3288ff] text-[#3288ff]"
                >
                  멍생네컷 홈으로
                </button>
              </div>
            </div>
          ) : (
            <p>다운로드할 이미지가 없습니다.</p>
          )}
        </div>
        <div className="block">
          <div
            className="absolute z-10 top-[2%] md:top-[10%] left-[85%] md:left-[80%] bg-white rounded-full w-12 h-12 flex justify-center items-center shadow-md cursor-pointer"
            onClick={() => setShowShareOptions(!showShareOptions)}
          >
            <LuShare2 size={22} />
          </div>

          {showShareOptions && (
            <div className="absolute top-[2%] md:top-[10%] left-[85%] md:left-[80%] bg-[#f1f1f1] rounded-full shadow-md w-12 h-[190px] flex flex-col items-center gap-2 pt-[60px]">
              <button
                onClick={() =>
                  window.open('https://www.instagram.com/', '_blank')
                }
                className="flex items-center justify-center bg-white rounded-full w-9 h-9"
              >
                <FaInstagram size={22} className="text-[#E4405F]" />
              </button>

              <button
                onClick={() =>
                  window.open('https://www.facebook.com/', '_blank')
                }
                className="flex items-center justify-center bg-white rounded-full w-9 h-9"
              >
                <FaFacebookF size={22} className="text-[#1877F2]" />
              </button>

              <button
                onClick={() => window.open('https://x.com/', '_blank')}
                className="flex items-center justify-center bg-white rounded-full w-9 h-9"
              >
                <FaXTwitter size={22} className="text-black" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadPhoto;
