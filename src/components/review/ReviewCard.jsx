import usericon from '../../assets/MypageImg/user.svg';
import { RxStarFilled } from 'react-icons/rx';
import ReviewDetailModal from './ReviewDetailModal';
import { useState } from 'react';
const ReviewCard = ({ review }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const {
    reviewId,
    content,
    nickname,
    score,
    visitDate,
    file,
    profileImageUrl,
  } = review;
  return (
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
              {/* <IoIosStar /> */}
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
      <div className="flex flex-row items-center justify-start gap-3 mt-3">
        {file.length > 0 ? (
          <>
            {file.slice(0, 4).map((file, index) => (
              <img
                key={index}
                className="w-32 h-32  bg-[#D9D9D9] rounded-lg items-center justify-center flex-row flex  flex-wrap"
                src={file.fileUrl || usericon}
              />
            ))}
            {file.length > 4 && (
              <div className="flex w-32 h-32  bg-[#808080] rounded-lg items-center justify-center text-white poi">
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
  );
};

export default ReviewCard;
