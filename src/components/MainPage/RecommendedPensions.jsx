import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import treeIcon from "../../stories/assets/tree.svg";
import emptyIcon from "../../assets/common/petgray.svg";

const RecommendedPensions = () => {
  const [pensions, setPensions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendedPensions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("ACCESS_TOKEN");

        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await axios.get(
          "https://meong9.store/api/v1/spots/recommendations",
          { headers }
        );

        const { data } = response.data;

        if (data && data.recommend) {
          setPensions(data.recommend);
        } else {
          setError("추천 펜션 데이터를 불러오지 못했습니다.");
        }
      } catch (err) {
        Swal.fire({
          title: "오류 발생",
          text:
            err.response?.data?.message ||
            "추천 펜션 데이터를 불러오지 못했습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
        setError("데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedPensions();
  }, []);

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

  const handlePensionClick = (id) => {
    navigate(`/pension-detail/${id}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg relative">
      <div className="flex items-center mb-2">
        <h2 className="text-lg font-bold mb-0">
          추천 펜션
          <img
            src={treeIcon}
            alt="리뷰 아이콘"
            className="inline-block w-6 h-6 relative"
            style={{ top: "-5px", left: "10px" }}
          />
        </h2>
      </div>

      {pensions.length > 0 ? (
        <div
          ref={scrollRef}
          className="
            flex gap-x-4 overflow-x-auto snap-x snap-mandatory 
            scrollbar-thin scrollbar-thumb-[#3288ff] scrollbar-track-gray-200 
            sm:scrollbar-none pb-1 mb-[-1px]"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseUp={handleMouseUpOrLeave}
        >
          {pensions.map((pension) => (
            <div
              key={pension.id}
              className="flex-none w-60 bg-white rounded-lg text-center snap-start cursor-pointer"
              onClick={() => handlePensionClick(pension.id)}
            >
              <div
                className="w-48 h-24 bg-gray-300 rounded-lg mb-2 sm:w-full h-32"
                style={{
                  backgroundImage: `url(${pension.img || emptyIcon})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                role="img"
                aria-label={pension.name}
              >
                <img
                  src={pension.img || emptyIcon}
                  alt={pension.name}
                  className="hidden"
                  onError={(e) => {
                    e.target.parentElement.style.backgroundImage = `url(${emptyIcon})`;
                  }}
                  />
              </div>
              <h3 className="text-base font-semibold text-gray-800 truncate sm:pr-0 pr-12">
                {pension.name}
              </h3>
              <p className="text-sm text-gray-500 truncate sm:pr-0 pr-12">
                {pension.address}
              </p>
              <p className="text-sm text-gray-500 mt-1 sm:pr-0 pr-12">
                ⭐ {pension.reviewAvg || "0"} ({pension.reviewCount || "0"} 리뷰)
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          추천 펜션 데이터를 찾을 수 없습니다.
        </p>
      )}
    </div>
  );
};

export default RecommendedPensions;
