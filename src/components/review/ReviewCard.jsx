import { IoIosStar } from 'react-icons/io';
import usericon from '../../assets/MypageImg/user.svg';
const ReviewCard = ({ review }) => {
  const { name, reviewContent, nickname, reviewAvg, date, img } = review;
  return (
    <div className="">
      <div className="flex flex-col h-[260px] justify-between">
        <div>
          <div className="mb-3 text-2xl font-semibold">{name}</div>
          <div className="flex flex-row justify-between">
            <div className="flex items-center">
              <img
                className="bg-[#F5F5F5] border border-[#8A8A8A] rounded-full size-6"
                src={usericon}
              />
              <span className="ml-2 text-[#8A8A8A]">작성자: {nickname}</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-[#FDBD00] text-2xl">
                <IoIosStar />
              </span>
              <span className="ml-1 font-semibold">{reviewAvg}</span>
              <span className="font-extralight text-[#8A8A8A] text-sm ml-3">
                {date}
              </span>
            </div>
          </div>
          <div className="mt-3 font-light ">{reviewContent}</div>
        </div>
        <div className="flex flex-row gap-2 mt-3">
          <img
            className="w-32 h-32 bg-[#D9D9D9] rounded-lg items-center justify-center"
            src={img}
            alt="리뷰 이미지"
          />
          <div className="flex w-32 h-32  bg-[#808080] rounded-lg items-center justify-center text-white">
            더보기
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
