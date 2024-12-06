import React, { useEffect, useState } from "react";
import { instance } from "../../api/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RecommendedPensions = () => {
  const [pensions, setPensions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 추가

  useEffect(() => {
    const fetchRecommendedPensions = async () => {
      try {
        setLoading(true);

        const memberId = localStorage.getItem("MEMBER_ID");
        const token = localStorage.getItem("ACCESS_TOKEN");

        if (!memberId || !token) {
          handleNotLoggedIn();
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        };

        const response = await instance.get('/spots/recommendations', {
          headers,
          params: { memberId },
        });

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
          text: err.message || "추천 펜션 데이터를 불러오지 못했습니다.",
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

  const handleNotLoggedIn = () => {
    Swal.fire({
      title: "로그인 필요",
      text: "로그인이 필요합니다. 로그인 페이지로 이동합니다.",
      icon: "info",
      confirmButtonText: "확인",
    }).then(() => {
      window.location.href = "/login";
    });
  };

  const handlePensionClick = (id) => {
    // PensionDetailPage로 이동
    navigate(`/pension-detail/${id}`);
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
    <section className="p-4">
      <h2 className="text-lg font-bold mb-2">추천 펜션 ✨</h2>
      <div className="flex gap-4 overflow-x-auto">
        {pensions.map((pension) => (
          <div
            key={pension.id}
            className="min-w-[200px] p-4 bg-white shadow-md rounded-lg text-center cursor-pointer"
            onClick={() => handlePensionClick(pension.id)} // 클릭 핸들러 추가
          >
            <div
              className="w-full h-40 bg-gray-300 rounded-lg mb-2"
              style={{
                backgroundImage: `url(${pension.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <h3 className="text-sm font-bold">{pension.name}</h3>
            <p className="text-xs text-gray-500">{pension.address}</p>
            <p className="text-sm text-yellow-500 mt-1">
              ⭐ {pension.reviewAvg} ({pension.reviewCount} 리뷰)
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedPensions;
