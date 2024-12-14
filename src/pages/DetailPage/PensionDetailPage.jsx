import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReservationRoomSection from "../../components/DetailPage/ReservationRoomSection";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import RecommendedFacility from "../../components/DetailPage/RecommendedFacility";
import ReviewDetailModal from "../../components/review/ReviewDetailModal"; // Modal import

// Custom Previous Arrow
const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "rgba(0, 0, 0, 0.5)",
        borderRadius: "50%",
        padding: "10px",
        zIndex: 2,
        left: "10px",
      }}
      onClick={onClick}
    >
      ❮
    </div>
  );
};

// Custom Next Arrow
const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "rgba(0, 0, 0, 0.5)",
        borderRadius: "50%",
        padding: "10px",
        zIndex: 2,
        right: "10px",
      }}
      onClick={onClick}
    >
      ❯
    </div>
  );
};

const PensionDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const scrollRef = useRef(null);
  const [pensionDetail, setPensionDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullIntro, setShowFullIntro] = useState(false);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false); // Modal state
  const [selectedReview, setSelectedReview] = useState(null); // Selected review

  useEffect(() => {
    const fetchPensionDetail = async () => {
      try {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        const headers = { Accept: "application/json" };

        if (accessToken) {
          headers.Authorization = `Bearer ${accessToken}`;
        }

        const response = await axios.get(
          `https://meong9.store/api/v1/pensions/detail/${id}`,
          { headers }
        );
        setPensionDetail(response.data.data);
      } catch (err) {
        setError("펜션 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPensionDetail();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;
  if (!pensionDetail) return <div>유효한 펜션 정보가 없습니다.</div>;

  const images = pensionDetail.images.slice(0, 5);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const maxLines = 10;
  const introductionLines = pensionDetail.introduction.split("\n");

  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setIsReviewModalOpen(true);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f9fafb" }}>
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">

        <button className="text-gray-400"></button>
      </header>

      <div className="w-full h-[400px] overflow-hidden">
        <Slider {...sliderSettings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Pension Image ${index + 1}`}
                className="w-full h-[400px] object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Info Section */}
      <section className="p-4 bg-white mt-4">
        <h2 className="text-lg font-bold mb-2">{pensionDetail.pensionName}</h2>
        <p className="text-sm text-gray-500">{pensionDetail.address}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 mr-2">⭐ {pensionDetail.reviewAvg}</span>
          <span className="text-sm text-gray-500">
            ({pensionDetail.reviewCount})
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {pensionDetail.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Description Section */}
      <section className="p-4 bg-white mt-4">
        <h3 className="text-lg font-bold mb-2">소개글</h3>
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {showFullIntro
            ? pensionDetail.introduction
            : introductionLines.slice(0, maxLines).join("\n")}
        </p>
        {introductionLines.length > maxLines && (
          <button
            onClick={() => setShowFullIntro(!showFullIntro)}
            className="text-blue-500 text-sm mt-2"
          >
            {showFullIntro ? "접기" : "더보기"}
          </button>
        )}
      </section>

      {/* Reservation Section */}
      <section className="p-4 bg-white mt-4">
        <h3 className="text-lg font-bold mb-2">예약 정보</h3>
        <p className="text-sm text-gray-500 whitespace-pre-line">
          {pensionDetail.limitInfo}
        </p>
        <ReservationRoomSection pensionId={id} />
      </section>

      {/* Basic Info Section */}
      <section className="p-4 bg-white mt-4">
        <h3 className="text-lg font-bold mb-2">기본 정보</h3>
        <p className="text-sm text-gray-500 whitespace-pre-line">
          {pensionDetail.info}
        </p>
      </section>

      {/* Review Section */}
      <section className="p-4 bg-white mt-4 relative">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">리얼 포토 리뷰</h3>
          <button
            className="text-sm text-blue-500 hover:underline"
            onClick={() => navigate(`/all-review/${id}`)}
          >
            전체보기 &gt;
          </button>
        </div>
        <div className="relative">
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
            {pensionDetail.review.slice(0, 20).map((review, index) => {
              const firstFileUrl =
                review.file && review.file.length > 0 ? review.file[0].fileUrl : null;

              return (
                <div
                  key={index}
                  onClick={() => handleReviewClick(review)}
                  className="flex-none w-36 rounded-lg bg-gray-50 shadow-md p-2 cursor-pointer"
                >
                  <img
                    src={firstFileUrl || "https://via.placeholder.com/150"}
                    alt="리뷰 사진"
                    className="w-full h-24 rounded-lg object-cover"
                  />
                  <p className="text-sm font-bold mt-2 truncate">
                    {review.nickname}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {review.content.slice(0, 30)}...
                  </p>
                </div>
              );
            })}
          </div>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md hover:bg-blue-600 z-10"
          >
            ▶
          </button>
        </div>
      </section>

      {/* Recommended Facility Section */}
      <RecommendedFacility pensionId={id} />

      {/* Review Modal */}
      {isReviewModalOpen && (
        <ReviewDetailModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          reviewData={selectedReview}
        />
      )}
    </div>
  );
};

export default PensionDetailPage;