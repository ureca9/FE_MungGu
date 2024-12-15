import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const PlaceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [placeDetail, setPlaceDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likeStatus, setLikeStatus] = useState(false); 

  const fetchPlaceDetail = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      const headers = {
        Accept: "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      };

      const response = await axios.get(
        `https://meong9.store/api/v1/places/detail/${id}`,
        { headers }
      );

      const data = response.data.data || {};
      setPlaceDetail({
        placeName: data.placeName || "정보 없음",
        address: data.address || "정보 없음",
        reviewCount: data.reviewCount || 0,
        reviewAvg: data.reviewAvg || 0,
        tags: data.tags || [],
        businessHour: data.businessHour || "정보 없음",
        telNo: data.telNo || "정보 없음",
        hmpgUrl: data.hmpgUrl || null,
        description: data.description || "정보 없음",
        images: data.images || [],
        photoReviewList: data.photoReviewList || [],
        review: data.review || [],
      });
      setLikeStatus(data.likeStatus || false); 
    } catch (error) {
      if (error.response?.status === 404) {
        setError(
          error.response.data?.message || "데이터를 찾을 수 없습니다."
        );
      } else {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async () => {
    try {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      };

      await axios.post(
        `https://meong9.store/api/v1/places/likes/${id}`,
        {},
        { headers }
      );

      setLikeStatus((prevStatus) => !prevStatus);
    } catch (error) {
      console.error("찜 상태 업데이트 실패:", error);
      alert("찜 상태를 업데이트하는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchPlaceDetail();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          이전 페이지로 돌아가기
        </button>
      </div>
    );
  }

  if (!placeDetail) {
    return <div className="p-4">잘못된 데이터입니다.</div>;
  }

  const {
    placeName,
    address,
    reviewCount,
    reviewAvg,
    tags = [],
    businessHour,
    telNo,
    hmpgUrl,
    description,
    images = [],
    photoReviewList = [],
    review = [],
  } = placeDetail;

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md p-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-600 text-lg"
        >
          {"<"}
        </button>
      </header>

      <div className="bg-gray-300 h-48 w-full flex items-center justify-center">
        <img
          src={images[0] || "https://via.placeholder.com/800x300"}
          alt={placeName}
          className="h-full w-full object-cover"
        />
      </div>

      <section className="bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{placeName}</h2>
          <button
            onClick={toggleLike}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              likeStatus ? "text-red-500" : "text-gray-400"
            }`}
          >
            {likeStatus ? "❤️" : "🤍"}
          </button>
        </div>
        <p className="text-gray-600 text-sm mb-2">{address}</p>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-yellow-500 text-sm">
            ⭐ {reviewAvg} ({reviewCount} 리뷰)
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-white mt-4 p-4">
        <h3 className="text-lg font-bold mb-2">운영 정보</h3>
        <p>운영 시간: {businessHour || "정보 없음"}</p>
        <p>전화 번호: {telNo || "정보 없음"}</p>
        {hmpgUrl && (
          <p>
            홈페이지:{" "}
            <a
              href={hmpgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {hmpgUrl}
            </a>
          </p>
        )}
      </section>

      <section className="bg-white mt-4 p-4">
        <h3 className="text-lg font-bold mb-2">시설 정보</h3>
        <p className="text-gray-600 text-sm">{description || "설명 없음"}</p>
      </section>

      {photoReviewList.length > 0 && (
        <section className="p-4 bg-white mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">리얼 포토 리뷰</h3>
            <button
              className="text-sm text-blue-500 hover:underline"
              onClick={() => navigate(`/all-review/${id}`)}
            >
              전체보기 &gt;
            </button>
          </div>
          <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-thumb-[#3288ff] scrollbar-track-gray-200">
            {photoReviewList.map((photoReview) => {
              const matchingReview = review.find(
                (r) => String(r.reviewId) === String(photoReview.reviewId)
              );

              return (
                <div
                  key={photoReview.reviewId}
                  className="flex-none w-36 bg-gray-50 rounded-lg shadow-md p-2 text-center"
                >
                  <img
                    src={
                      photoReview.representativeImageUrl ||
                      "https://via.placeholder.com/150"
                    }
                    alt="포토 리뷰"
                    className="w-full h-24 rounded-lg object-cover mb-2"
                  />
                  <p className="text-sm font-bold truncate">
                    {matchingReview?.nickname || "작성자 없음"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {matchingReview?.content || "리뷰 내용 없음"}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default PlaceDetailPage;
