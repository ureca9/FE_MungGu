import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ROUTER_PATHS from '../../utils/RouterPath';
import downloadBG from '../../assets/mungsengneacut/downloadBG.svg';
import Swal from 'sweetalert2';
import { instance } from '../../api/axios';
import LOCAL_STORAGE_KEYS from '../../utils/LocalStorageKey';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { LuShare2 } from 'react-icons/lu';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const DownloadPhoto = () => {
  const location = useLocation();
  const { capturedImage } = location.state || {};
  const [accessToken] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN),
  );
  const [imageDownloadUrl, setImageDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const navigate = useNavigate();
  const MungsengneacutHome = () => {
    navigate(ROUTER_PATHS.MUNGSENGNEACUT);
  };

  const fetchImageDownloadUrl = async () => {
    try {
      setLoading(true);
      const response = await fetch(capturedImage);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('image', blob, 'capturedImage.png');

      const apiResponse = await instance.post('/photos', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      if (
        apiResponse.status === 200 &&
        apiResponse.data.message === 'success'
      ) {
        const { imageDownloadUrl: url, processing } = apiResponse.data.data;
        if (processing) {
          Swal.fire({
            icon: 'info',
            title: '처리 중',
            text: '이미지를 처리 중입니다. 캡처된 이미지를 다운로드하세요.',
            confirmButtonColor: '#3288FF',
          });
        }
        setImageDownloadUrl(url);
      } else {
        throw new Error('서버에서 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error fetching image download URL:', error);
      Swal.fire({
        icon: 'error',
        title: '다운로드 실패',
        text: '이미지 다운로드 URL을 가져오는 중 문제가 발생했습니다.',
        confirmButtonColor: '#3288FF',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken && capturedImage) {
      fetchImageDownloadUrl();
    } else {
      setLoading(false);
    }
  }, [accessToken, capturedImage]);

  const handleDownload = () => {
    if (imageDownloadUrl) {
      const link = document.createElement('a');
      link.href = imageDownloadUrl;
      link.download = '멍생네컷.png';
      link.click();
    } else if (capturedImage) {
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = '멍생네컷.png';
      link.click();
    } else {
      Swal.fire({
        icon: 'error',
        title: '다운로드 실패',
        text: '다운로드할 이미지를 찾을 수 없습니다.',
        confirmButtonColor: '#3288FF',
      });
    }
  };

  const handleShare = async (platform, imageUrl) => {
    try {
      if (!imageUrl) {
        throw new Error('공유할 이미지가 없습니다.');
      }

      const shareData = {
        instagram: `https://www.instagram.com/share?url=${encodeURIComponent(imageUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(imageUrl)}`,
      };

      if (navigator.share && platform === 'native') {
        await navigator.share({
          url: imageUrl,
          title: '멍생네컷',
        });
      } else {
        window.open(shareData[platform], '_blank');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: '공유 실패',
        text: '이미지 공유 중 문제가 발생했습니다.',
        confirmButtonColor: '#3288FF',
      });
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
          <img src={downloadBG} alt="배경" className="max-w-full opacity-65" />
          {capturedImage ? (
            <div className="block absolute top-[10%] left-[23%] p-4 rounded-lg bg-white shadow-md">
              <img
                src={imageDownloadUrl || capturedImage}
                alt="Captured Photo"
                className="w-full h-auto mb-4 "
              />
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handleDownload}
                  className="w-[140px] py-2 text-white bg-blue-500 rounded-lg"
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
            </div>
          ) : (
            <p>다운로드할 이미지가 없습니다.</p>
          )}
        </div>
        <div className="block">
          <div
            className="absolute z-10 top-[10%] left-[80%] bg-white rounded-full w-12 h-12 flex justify-center items-center shadow-md cursor-pointer"
            onClick={() => setShowShareOptions(!showShareOptions)}
          >
            <LuShare2 size={22} />
          </div>

          {showShareOptions && (
            <div className="absolute top-[10%] left-[80%] bg-[#f1f1f1] rounded-full shadow-md w-12 h-[190px] flex flex-col items-center gap-2 pt-[60px]">
              <button
                onClick={() => handleShare('instagram', imageDownloadUrl)}
                className="flex items-center justify-center bg-white rounded-full w-9 h-9"
              >
                <div className="flex items-center justify-center bg-white rounded-full w-9 h-9">
                  <FaInstagram size={22} className="text-[#E4405F]" />
                </div>
              </button>
              <button
                onClick={() => handleShare('instagram', imageDownloadUrl)}
                className="flex items-center justify-center bg-white rounded-full w-9 h-9"
              >
                <div className="flex items-center justify-center bg-white rounded-full w-9 h-9">
                  <FaFacebookF size={22} className="text-[#1877F2]" />
                </div>
              </button>
              <button
                onClick={() => handleShare('instagram', imageDownloadUrl)}
                className="flex items-center justify-center bg-white rounded-full w-9 h-9"
              >
                <div className="flex items-center justify-center bg-white rounded-full w-9 h-9">
                  <FaTwitter size={22} className="text-[#1DA1F2]" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadPhoto;
