import { Description, Dialog, DialogPanel } from '@headlessui/react';
import { useEffect, useRef, useState } from 'react';
import { RxStarFilled } from 'react-icons/rx';
import usericon from '../../assets/MypageImg/user.svg';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { CircularProgress } from '@mui/material';

const ReviewDetailModal = ({ isOpen, onClose, reviewData = {} }) => {
  const scrollRef = useRef(null);
  const { content, nickname, score, visitDate, file, profileImageUrl } =
    reviewData;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < file.length - 1 ? prevIndex + 1 : 0,
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : file.length - 1,
    );
  };
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleClickImage = (index) => {
    setCurrentImageIndex(index);
    setIsLoading(true);
  };

  useEffect(() => {
    const ref = scrollRef.current;
    const handleWheel = (e) => {
      e.stopPropagation();
      if (e.deltaY > 0) {
        ref.scrollLeft += 40;
      } else {
        ref.scrollLeft -= 40;
      }
    };

    if (ref && isOpen && ref.current) {
      ref.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (ref) {
        ref.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isOpen, scrollRef]);

  const handleWheel = (e) => {
    e.stopPropagation();
    const ref = scrollRef.current;
    if (e.deltaY > 0) {
      ref.scrollLeft += 40;
    } else {
      ref.scrollLeft -= 40;
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('wheel', handleWheel);
    }
    return () => {
      if (ref) {
        ref.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  useEffect(() => {
    const ref = scrollRef.current;
    if (isOpen && ref) {
      ref.addEventListener('wheel', handleWheel);
    }
    return () => {
      if (ref) {
        ref.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="flex bg-white h-4/5 w-full min-w-[375px] md:max-w-6xl md:h-2/4">
          <Description
            as="div"
            className="flex flex-col w-full h-full md:flex-row "
          >
            <div className="relative overflow:hidden flex items-center justify-center w-full h-2/5 md:w-1/2 md:h-full bg-[#D9D9D9]">
              {file.length > 0 ? (
                <>
                  {isLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      <CircularProgress size={60} />
                    </div>
                  )}
                  {file[currentImageIndex].fileType === 'IMAGE' ? (
                    <img
                      className="flex object-contain w-full h-full"
                      src={file[currentImageIndex].fileUrl}
                      onLoad={handleImageLoad}
                    />
                  ) : file[currentImageIndex].fileType === 'VIDEO' ? (
                    <video
                      className="flex object-contain w-full h-full"
                      src={file[currentImageIndex].fileUrl}
                      controls
                      autoPlay
                      muted
                      playsInline
                      disablePictureInPicture
                    />
                  ) : null}
                  <button
                    className="absolute text-6xl text-white transform -translate-y-1/2 left-4 top-1/2"
                    onClick={handlePrevImage}
                  >
                    <BsChevronCompactLeft />
                  </button>
                  <button
                    className="absolute text-6xl text-white transform -translate-y-1/2 right-4 top-1/2"
                    onClick={handleNextImage}
                  >
                    <BsChevronCompactRight />
                  </button>
                </>
              ) : (
                <div className="flex w-full h-full  bg-[#D9D9D9] rounded-lg items-center justify-center text-[#8A8A8A]">
                  이미지 없음
                </div>
              )}
            </div>
            <div className="flex flex-col w-full p-5 h-3/5 md:w-1/2 md:h-full">
              <div className="flex flex-row justify-between">
                <div className="flex items-center">
                  <img
                    className="bg-[#F5F5F5] border border-[#8A8A8A] rounded-full size-12"
                    src={profileImageUrl || usericon}
                  />
                  <span className="ml-2 text-[#8A8A8A]">{nickname} 님</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-[#FDBD00] text-2xl">
                    <RxStarFilled />
                  </span>
                  <span className="ml-1 font-semibold">{score}.0</span>
                  <span className="font-extralight text-[#8A8A8A] text-sm ml-3">
                    {visitDate}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-between flex-grow h-full mt-5 overflow-y-auto scrollbar-none">
                <div className="flex mb-2 overflow-y-auto scrollbar-none">
                  {content}
                </div>
                <div
                  ref={scrollRef}
                  className="flex items-end w-full gap-1 overflow-x-auto min-h-28 "
                >
                  {file.map((file, index) => (
                    <div
                      key={index}
                      onClick={() => handleClickImage(index)}
                      className="min-w-20 max-w-20 h-20 bg-[#D9D9D9] rounded-lg flex items-center justify-center cursor-pointer"
                    >
                      {file.fileType === 'IMAGE' ? (
                        <img
                          className="object-cover w-full h-full rounded-lg"
                          src={file.fileUrl}
                        />
                      ) : file.fileType === 'VIDEO' ? (
                        <video
                          className="object-cover w-full h-full rounded-lg"
                          src={file.fileUrl}
                          disablePictureInPicture
                          onClick={(e) => e.preventDefault()}
                          onPlay={(e) => e.preventDefault()}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Description>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ReviewDetailModal;
