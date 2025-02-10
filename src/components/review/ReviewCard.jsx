import usericon from '../../assets/my-page-img/user.svg';
import { RxStarFilled } from 'react-icons/rx';
import ReviewDetailModal from './ReviewDetailModal';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LazyLoadImage from './LazyLoadImage'; // LazyLoadImage 컴포넌트 import

const ReviewCard = ({ review }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { ref, inView } = useInView({ threshold: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('downward');

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const { content, nickname, score, visitDate, file, profileImageUrl } = review;

  // Video Ref 추가
  const videoRef = useRef(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'downward' : 'upward';
      setScrollDirection(direction);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (inView && scrollDirection === 'downward' && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, scrollDirection, hasAnimated]);

  // m3u8 재생을 위한 video type 설정 및 HLS.js 사용
  useEffect(() => {
    if (!videoRef.current || !file?.some((f) => f.fileType === 'VIDEO')) return;

    import('hls.js').then(({ default: Hls }) => {
      file.forEach((f) => {
        if (f.fileType === 'VIDEO' && f.fileUrl.endsWith('.m3u8')) {
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(f.fileUrl);
            hls.attachMedia(videoRef.current);
          } else if (
            videoRef.current.canPlayType('application/vnd.apple.mpegurl')
          ) {
            videoRef.current.src = f.fileUrl;
          }
        }
      });
    });
  }, [file]);

  return (
    <motion.div
    // ref={ref}
    // initial={{ opacity: 0, y: 10 }}
    // animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
    // transition={{ duration: 0.2 }}
    >
      <div
        className="flex flex-col justify-between h-auto cursor-pointer"
        onClick={handleOpenModal}
      >
        <div>
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
              <span className="ml-1 font-semibold">{score}</span>
              <span className="font-extralight text-[#8A8A8A] text-md ml-3">
                {visitDate}
              </span>
            </div>
          </div>
          <div className="mt-3 font-light line-clamp-2">{content}</div>
        </div>
        <div className="flex flex-row items-center justify-start gap-1 mt-3 md:gap-3">
          {file.length > 0 ? (
            <>
              {file.slice(0, 4).map((file, index) => (
                <div
                  key={index}
                  className="w-20 h-20 md:w-32 md:h-32 overflow-hidden bg-[#D9D9D9] rounded-lg items-center justify-center flex-row flex flex-wrap transition duration-300 transform hover:scale-110"
                >
                  {file.fileType === 'IMAGE' ? (
                    <LazyLoadImage // LazyLoadImage 컴포넌트 사용
                      src={file.fileUrl}
                      alt="Review Image"
                      className="object-cover w-full h-full"
                      sizes="(max-width: 768px) 20vw, 32vw"
                    />
                  ) : file.fileType === 'VIDEO' ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      loop
                      playsInline
                      disablePictureInPicture
                      className="object-cover w-full h-full"
                    >
                      <source
                        src={file.fileUrl}
                        type={
                          file.fileUrl.endsWith('.m3u8')
                            ? 'application/x-mpegURL'
                            : 'video/mp4'
                        }
                      />
                      브라우저에서 비디오 태그를 지원하지 않습니다.
                    </video>
                  ) : null}
                </div>
              ))}
              {file.length > 4 && (
                <div className="flex w-20 min-h-20 md:w-32 md:h-32  bg-[#808080] rounded-lg items-center justify-center text-white poi transition duration-300 transform hover:scale-110">
                  더보기
                </div>
              )}
            </>
          ) : (
            ''
          )}
          <ReviewDetailModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            reviewData={review}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
