import React, { useState, useEffect } from "react";
import axios from "axios";

const LiveReviews = ({ accessToken }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p className="text-center text-gray-500">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">실시간 리뷰</h2>
      {reviews.length > 0 ? (
        <ul className="flex space-x-4 overflow-x-auto">
          {reviews.map((review) => (
            <li
              key={review.reviewId}
              className="flex-none w-60 p-4 bg-white rounded-lg shadow-md"
            >
              <img
                src={review.img}
                alt={`${review.name} 대표 이미지`}
                className="w-full h-32 rounded-lg object-cover mb-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {review.name}
                </h3>
                <p className="text-sm text-gray-500">{review.address}</p>
                <p className="text-gray-700 mt-2 text-sm line-clamp-3">
                  {review.reviewContent}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>⭐ {review.reviewAvg}</span>
                    <span>({review.reviewCount} 리뷰)</span>
                  </div>
                  <span className="text-sm italic text-gray-400">
                    {review.nickname}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">등록된 리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default LiveReviews;
