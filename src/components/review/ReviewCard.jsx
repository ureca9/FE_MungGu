import { IoIosStar } from 'react-icons/io';
import usericon from '../../assets/MypageImg/user.svg';
import { RxStarFilled } from 'react-icons/rx';
import { SiStarbucks } from 'react-icons/si';
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
    <div className="">
      <div className="flex flex-col justify-between h-auto">
        <div>
          {/* <div className="mb-3 text-2xl font-semibold">{name}</div> */}
          <div className="flex flex-row justify-between">
            <div className="flex items-center">
              <img
                className="bg-[#F5F5F5] border border-[#8A8A8A] rounded-full size-12"
                src={profileImageUrl || usericon}
              />
              <span className="ml-2 text-[#8A8A8A]">작성자: {nickname}</span>
            </div>
            <div className="flex items-center justify-center">
              {/* <span className="text-[#FDBD00] text-2xl"> */}
              <span className="text-[#258c2c] text-9xl">
                <IoIosStar />
                <RxStarFilled />
                <SiStarbucks />
              </span>
              <span className="ml-1 font-semibold">{score}</span>
              <span className="font-extralight text-[#8A8A8A] text-sm ml-3">
                {visitDate}
              </span>
            </div>
          </div>
          <div className="mt-3 font-light line-clamp-2">{content}</div>
        </div>
        <div className="flex flex-row gap-2 mt-3">
          {file.map((file, index) => (
            <img
              key={index}
              className="w-32 h-32  bg-[#D9D9D9] rounded-lg items-center justify-center"
              src={file.fileUrl}
            />
          ))}
          <div
            className="flex w-32 h-32  bg-[#808080] rounded-lg items-center justify-center text-white"
            onClick={handleOpenModal}
          >
            더보기
          </div>

          <ReviewDetailModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
