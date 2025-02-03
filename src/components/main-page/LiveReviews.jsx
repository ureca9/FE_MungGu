import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import reviewIcon from '../../stories/assets/reviewicon.svg';
import reviewenptyIcon from '../../assets/common/petgray.svg';

const LiveReviews = ({ accessToken }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
        if (accessToken) {
          headers.Authorization = `Bearer ${accessToken}`;
        }

        const response = await axios.get(
          'https://meong9.store/api/v1/spots/reviews',
          { headers },
        );

        if (response.data?.data?.review) {
          setReviews(response.data.data.review);
        } else {
          setReviews([]);
        }
      } catch (err) {
        setError('리뷰 데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [accessToken]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const handleReviewClick = (type, id) => {
    if (type === '펜션') {
      navigate(`/pension-detail/${id}`);
    } else if (type === '시설') {
      navigate(`/place/${id}`);
    }
  };

  if (loading) return <p className="text-center text-gray-500">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="relative pt-6 pb-6 bg-white rounded-lg">
      <div className="flex items-center mb-4">
        <h2 className="mb-0 text-lg font-bold">
          최근 리뷰
          <img
            src={reviewIcon}
            alt="리뷰 아이콘"
            className="relative inline-block w-6 h-6"
            style={{ top: '-5px', left: '10px' }}
          />
        </h2>
      </div>

      {reviews.length > 0 ? (
        <div
          ref={scrollRef}
          className="
            flex gap-3 overflow-x-auto snap-x snap-mandatory
            scrollbar-thin scrollbar-thumb-[#3288ff] scrollbar-track-gray-200 
            sm:scrollbar-none"
          style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }} 
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseUp={handleMouseUpOrLeave}
        >
          {reviews.map((review) => (
            <li
              key={review.reviewId}
              onClick={() => handleReviewClick(review.type, review.id)}
              className="flex-none mt-0 list-none transition bg-white rounded-lg cursor-pointer w-36 sm:w-60 snap-start hover:bg-gray-100"
              style={{ margin: 5 }}
            >
              <img
                src={review.img || reviewenptyIcon}
                alt={`${review.name} 대표 이미지`}
                className="object-cover w-full h-32 mb-0 rounded-lg"
              />
              <div className="flex-1 mt-0">
                <h3 className="h-6 m-0 text-base font-semibold text-gray-800 truncate">
                  {review.name}
                </h3>
                <p className="h-5 m-0 text-sm text-gray-500 truncate">
                  {review.address}
                </p>
                <p className="text-gray-700 text-sm line-clamp-1 sm:line-clamp-3 sm:h-[60px] mt-1 mb-0">
                  {review.reviewContent}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>⭐ {review.reviewAvg}</span>
                    <span>({review.reviewCount} 리뷰)</span>
                  </div>
                  <span className="h-5 m-0 text-sm italic text-gray-400 truncate">
                    {review.nickname}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">등록된 리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default LiveReviews;
