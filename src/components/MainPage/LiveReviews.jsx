import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import reviewIcon from "../../stories/assets/reviewicon.svg";
import reviewenptyIcon from "../../assets/common/petgray.svg"

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
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        if (accessToken) {
          headers.Authorization = `Bearer ${accessToken}`;
        }

        const response = await axios.get(
          "https://meong9.store/api/v1/spots/reviews",
          { headers }
        );

        if (response.data?.data?.review) {
          setReviews(response.data.data.review);
        } else {
          setReviews([]);
        }
      } catch (err) {
        setError("리뷰 데이터를 가져오는 중 오류가 발생했습니다.");
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
    if (type === "펜션") {
      navigate(`/pension-detail/${id}`);
    } else if (type === "시설") {
      navigate(`/place/${id}`);
    }
  };

  if (loading) return <p className="text-center text-gray-500">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="pl-1 pt-6 pr-6 pb-6 bg-white rounded-lg relative">
      <div className="flex items-center mb-0 pl-4">
        <h2 className="text-lg font-bold mb-0">
          최근 리뷰
          <img
            src={reviewIcon}
            alt="리뷰 아이콘"
            className="inline-block w-6 h-6 relative"
            style={{ top: "-5px", left: "10px" }}
          />
        </h2>
      </div>

      {reviews.length > 0 ? (
        <div
          ref={scrollRef}
          className="
            flex gap-x-[5px] overflow-x-auto snap-x snap-mandatory 
            scrollbar-thin scrollbar-thumb-[#3288ff] scrollbar-track-gray-200 
            sm:scrollbar-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseUp={handleMouseUpOrLeave}
        >
          {reviews.map((review) => (
            <li
            key={review.reviewId}
            onClick={() => handleReviewClick(review.type, review.id)}
            className="
              flex-none w-60 p-4 bg-white rounded-lg snap-start mt-0 list-none 
              cursor-pointer hover:bg-gray-100 transition"
            style={{ margin: 5 }}
          >
            <img
              src={review.img || reviewenptyIcon}
              alt={`${review.name} 대표 이미지`}
              className="w-full h-32 rounded-lg object-cover mb-0"
            />
            <div className="flex-1 mt-0">
              <h3 className="text-base font-semibold text-gray-800 truncate h-6 m-0">
                {review.name}
              </h3>
              <p className="text-sm text-gray-500 truncate h-5 m-0">
                {review.address}
              </p>
              <p className="text-gray-700 text-sm line-clamp-3 h-[60px] mt-1 mb-0">
                {review.reviewContent}
              </p>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>⭐ {review.reviewAvg}</span>
                  <span>({review.reviewCount} 리뷰)</span>
                </div>
                <span className="text-sm italic text-gray-400 truncate h-5 m-0">
                  {review.nickname}
                </span>
              </div>
            </div>
          </li>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">등록된 리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default LiveReviews;
