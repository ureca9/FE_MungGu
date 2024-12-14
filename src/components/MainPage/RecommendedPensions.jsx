import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RecommendedPensions = () => {
  const [pensions, setPensions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 체크
  const scrollRef = useRef(null); // 스크롤 컨테이너 참조
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendedPensions = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("ACCESS_TOKEN");

        // 로그인 상태 체크
        setIsLoggedIn(!!token);

        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };

        // `Authorization` 헤더는 토큰이 있는 경우에만 추가
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await axios.get(
          "https://meong9.store/api/v1/spots/recommendations",
          {
            headers,
          }
        );

        const { data } = response.data;

        if (data && data.recommend) {
          setPensions(data.recommend);
        } else {
          setError("추천 펜션 데이터를 불러오지 못했습니다.");
        }
      } catch (err) {
        console.error("추천 펜션 데이터를 불러오는 중 오류 발생:", err);
        Swal.fire({
          title: "오류 발생",
          text: err.response?.data?.message || "추천 펜션 데이터를 불러오지 못했습니다.",
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

  const handlePensionClick = (id) => {
    navigate(`/pension-detail/${id}`);
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // 로그인 페이지로 이동
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="p-4">
        <p className="text-gray-500">로딩 중...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          다시 시도하기
        </button>
      </section>
    );
  }

  return (
    <section className="p-4 relative">
      {!isLoggedIn && (
        <div className="absolute top-5 right-4">
          <button
            onClick={handleLoginRedirect}
            className="text-sm text-blue-500 hover:underline"
          >
            더 정확한 추천을 받으려면?
          </button>
        </div>
      )}

      <h2 className="text-lg font-bold mb-2">추천 펜션 ✨</h2>
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
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#3288ff] scrollbar-track-gray-200"
        >
          {pensions.map((pension) => (
            <div
              key={pension.id}
              className="min-w-[200px] p-4 bg-white shadow-md rounded-lg text-center cursor-pointer snap-start"
              onClick={() => handlePensionClick(pension.id)}
            >
              <div
                className="w-full h-40 bg-gray-300 rounded-lg mb-2"
                style={{
                  backgroundImage: `url(${pension.img || "https://via.placeholder.com/150"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <h3 className="text-sm font-bold">{pension.name}</h3>
              <p className="text-xs text-gray-500">{pension.address}</p>
              <p className="text-sm text-yellow-500 mt-1">
                ⭐ {pension.reviewAvg || "0"} ({pension.reviewCount || "0"} 리뷰)
              </p>
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

export default RecommendedPensions;
