import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecommendedFacility = ({ pensionId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null); // 스크롤 컨테이너 참조
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };

        if (accessToken) {
          headers.Authorization = `Bearer ${accessToken}`;
        }

        const response = await axios.get(
          `https://meong9.store/api/v1/pensions/${pensionId}/recommendations`,
          { headers }
        );

        setRecommendations(response.data.data.recommend || []);
      } catch (err) {
        setError("추천 시설 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchRecommendations();
  }, [pensionId]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  if (error) return <div>{error}</div>;
  if (recommendations.length === 0) return null;

  return (
    <section className="p-4 bg-white mt-4 relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">추천 시설</h3>
      </div>

      <div className="relative">
        {/* 좌우 스크롤 버튼 */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md hover:bg-blue-600 z-10"
        >
          ◀
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-sky-500 scrollbar-track-sky-100"
        >
          {recommendations.map((facility) => (
            <div
              key={facility.id}
              className="flex-none w-36 rounded-lg bg-gray-50 shadow-md p-2 cursor-pointer"
              onClick={() => navigate(`/place/${facility.id}`)}
            >
              <img
                src={facility.img || "https://via.placeholder.com/150"}
                alt={facility.name}
                className="w-full h-24 rounded-lg object-cover"
              />
              <p className="text-sm font-bold mt-2 truncate">{facility.name}</p>
              <p className="text-xs text-gray-500 truncate">{facility.address}</p>
              <div className="flex items-center mt-1">
                <span className="text-yellow-500 mr-1">⭐</span>
                <span className="text-xs text-gray-500">
                  {facility.reviewAvg || "0"} ({facility.reviewCount || "0"})
                </span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md hover:bg-blue-600 z-10"
        >
          ▶
        </button>
      </div>
    </section>
  );
};

export default RecommendedFacility;
