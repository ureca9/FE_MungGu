import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import reviewemptyIcon from '../../assets/common/petgray.svg';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ReviewSection = ({ reviews, onReviewClick, pensionId }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <section className="relative pt-4 pb-4 pr-4 mt-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <h3 className="pl-4 text-lg font-bold">리얼 리뷰</h3>
        <button
          className="text-sm text-blue-500 hover:underline"
          onClick={() => navigate(`/pension-all-review/${pensionId}`)}
        >
          전체보기 &gt;
        </button>
      </div>

      <div className="relative">
        <button className="absolute left-0 z-10 p-2 bg-white rounded-full shadow" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>
        <div ref={scrollRef} className="flex gap-2 p-4 overflow-x-auto bg-white scrollbar-hidden">
          {reviews.slice(0, 20).map((review, index) => {
            const firstFileUrl = review.file?.[0]?.fileUrl || reviewemptyIcon;
            const fileType = review.file?.[0]?.fileType || null;

            return (
              <div
                key={index}
                onClick={() => onReviewClick(review)}
                className="flex-none p-2 rounded-lg cursor-pointer w-36 bg-gray-50"
              >
                {fileType === 'IMAGE' ? (
                  <img src={firstFileUrl} alt="리뷰 사진" className="object-cover w-full h-24 rounded-lg" />
                ) : fileType === 'VIDEO' ? (
                  <video src={firstFileUrl} className="object-cover w-full h-24 rounded-lg" controls />
                ) : (
                  <div className="flex items-center justify-center w-full h-24 bg-gray-200 rounded-lg">
                    <img src={reviewemptyIcon} alt="빈 리뷰 아이콘" className="w-12 h-12" />
                  </div>
                )}
                <p className="mt-2 text-sm font-bold truncate">{review.nickname}</p>
                <p className="text-xs text-gray-500 truncate">{review.content.slice(0, 30)}...</p>
              </div>
            );
          })}
        </div>
        <button className="absolute right-0 z-10 p-2 bg-white rounded-full shadow" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default ReviewSection;