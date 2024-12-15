import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const LiveReviews = ({ accessToken }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null); 

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

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  if (loading) return <p className="text-center text-gray-500">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md relative">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">실시간 리뷰</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6 text-blue-500 ml-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m3 4v-4h-1m-3 8a9 9 0 100-18 9 9 0 000 18zm7-9h-2a1 1 0 00-1 1v3m-4-4H8m8 0h-3m-4 0h-.01"
          />
        </svg>
      </div>
      {reviews.length > 0 ? (
        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md hover:bg-blue-600 z-10"
          >
            ◀
          </button>
          <ul
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#3288ff] scrollbar-track-gray-200"
          >
            {reviews.map((review) => (
              <li
                key={review.reviewId}
                className="flex-none w-60 p-4 bg-white rounded-lg shadow-md snap-start"
              >
                <img
                  src={review.img || "https://via.placeholder.com/150"}
                  alt={`${review.name} 대표 이미지`}
                  className="w-full h-32 rounded-lg object-cover mb-4"
                />
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800 truncate h-6">
                    {review.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate h-5">
                    {review.address}
                  </p>
                  <p className="text-gray-700 mt-2 text-sm line-clamp-3 h-[60px]">
                    {review.reviewContent}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>⭐ {review.reviewAvg}</span>
                      <span>({review.reviewCount} 리뷰)</span>
                    </div>
                    <span className="text-sm italic text-gray-400 truncate h-5">
                      {review.nickname}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md hover:bg-blue-600 z-10"
          >
            ▶
          </button>
        </div>
      ) : (
        <p className="text-gray-500 text-center">등록된 리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default LiveReviews;
