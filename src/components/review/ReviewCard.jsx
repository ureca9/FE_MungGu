import usericon from '../../assets/MypageImg/user.svg';
import { RxStarFilled } from 'react-icons/rx';
import ReviewDetailModal from './ReviewDetailModal';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ReviewCard = ({ review }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { ref, inView } = useInView({ threshold: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('downward');

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const { content, nickname, score, visitDate, file, profileImageUrl } = review;

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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
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
              <span className="ml-1 font-semibold">{score}.0</span>
              <span className="font-extralight text-[#8A8A8A] text-sm ml-3">
                {visitDate}
              </span>
            </div>
          </div>
          <div className="mt-3 font-light line-clamp-2">{content}</div>
        </div>
        <div className="flex flex-row items-center justify-start gap-1 mt-3 sm:gap-3">
          {file.length > 0 ? (
            <>
              {file.slice(0, 4).map((file, index) => (
                <div
                  key={index}
                  className="w-20 h-20 sm:w-32 sm:h-32 overflow-hidden bg-[#D9D9D9] rounded-lg items-center justify-center flex-row flex flex-wrap"
                >
                  {file.fileType === 'IMAGE' ? (
                    <img
                      src={file.fileUrl}
                      className="object-cover w-full h-full"
                    />
                  ) : file.fileType === 'VIDEO' ? (
                    <video
                      src={file.fileUrl}
                      className="object-cover w-full h-full"
                      controls
                    />
                  ) : null}
                </div>
              ))}
              {file.length > 4 && (
                <div className="flex w-20 min-h-20 sm:w-32 sm:h-32  bg-[#808080] rounded-lg items-center justify-center text-white poi">
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
