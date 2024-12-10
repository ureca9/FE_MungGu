import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReservationRoomSection from "../../components/DetailPage/ReservationRoomSection";

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
        left: "10px", // Position adjustment
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
        right: "10px", // Position adjustment
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

  const [pensionDetail, setPensionDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullIntro, setShowFullIntro] = useState(false); // 추가된 상태

  useEffect(() => {
    const fetchPensionDetail = async () => {
      try {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        const headers = {
          Accept: "application/json",
        };
        
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

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  if (!pensionDetail) {
    return <div>유효한 펜션 정보가 없습니다.</div>;
  }

  const images = pensionDetail.images.slice(0, 5); // 첫 5개 이미지만 사용

  // React Slick 설정
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

  const maxLines = 10; // 최대 표시 줄 수
  const introductionLines = pensionDetail.introduction.split("\n");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f9fafb" }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{ fontSize: "18px", color: "#4a5568" }}
        >
          {"<"}
        </button>
        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
          {pensionDetail.pensionName}
        </h1>
        <button style={{ color: "#718096" }}></button>
      </header>

      {/* Image Section (Carousel) */}
      <div style={{ width: "100%", height: "400px", overflow: "hidden" }}>
        <Slider {...sliderSettings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Pension Image ${index + 1}`}
                style={{ width: "100%", height: "400px", objectFit: "cover" }}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Info Section */}
      <section
        style={{
          padding: "16px",
          backgroundColor: "#fff",
          marginTop: "16px",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>
          {pensionDetail.pensionName}
        </h2>
        <p style={{ fontSize: "14px", color: "#718096" }}>
          {pensionDetail.address}
        </p>
        <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
          <span style={{ color: "#ecc94b", marginRight: "8px" }}>
            ⭐ {pensionDetail.reviewAvg}
          </span>
          <span style={{ fontSize: "14px", color: "#718096" }}>
            ({pensionDetail.reviewCount})
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
          {pensionDetail.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "4px 8px",
                backgroundColor: "#edf2f7",
                fontSize: "12px",
                borderRadius: "8px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Description Section */}
      <section
        style={{
          padding: "16px",
          backgroundColor: "#fff",
          marginTop: "16px",
        }}
      >
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>
          소개글
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "#4a5568",
            whiteSpace: "pre-line",
            overflow: "hidden",
          }}
        >
          {showFullIntro
            ? pensionDetail.introduction
            : introductionLines.slice(0, maxLines).join("\n")}
        </p>
        {introductionLines.length > maxLines && (
          <button
            onClick={() => setShowFullIntro(!showFullIntro)}
            style={{
              marginTop: "8px",
              fontSize: "14px",
              color: "#3182ce",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0",
            }}
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
      </section>
        <ReservationRoomSection pensionId= {id}/>
      {/* Basic Info Section */}
      <section className="p-4 bg-white mt-4">
        <h3 className="text-lg font-bold mb-2">기본 정보</h3>
        <p className="text-sm text-gray-500 whitespace-pre-line">
          {pensionDetail.info}
        </p>
      </section>

      <section
  style={{
    padding: "16px",
    backgroundColor: "#fff",
    marginTop: "16px",
    overflowX: "auto",
    whiteSpace: "nowrap",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
    }}
  >
    <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>리얼 포토 리뷰</h3>
    <button
  style={{
    fontSize: "14px",
    color: "#3182ce",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
  }}
  onClick={() => navigate(`/all-review/${id}`)} // ID를 포함해 리뷰 페이지로 이동
>
  전체보기 >
</button>
  </div>

  <div
    style={{
      display: "inline-flex",
      gap: "16px",
    }}
  >
    {pensionDetail.review.slice(0, 20).map((review, index) => {
      // Get the first file URL if available
      const firstFileUrl =
        review.file && review.file.length > 0 ? review.file[0].fileUrl : null;

      return (
        <div
          key={index}
          style={{
            flex: "0 0 auto",
            width: "150px",
            borderRadius: "8px",
            backgroundColor: "#f9fafb",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "8px",
          }}
        >
          <img
            src={firstFileUrl || "https://via.placeholder.com/150"}
            alt="리뷰 사진"
            style={{
              width: "100%",
              height: "100px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
          <p
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              marginTop: "8px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {review.nickname}
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "#718096",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {review.content.slice(0, 30)}...
          </p>
        </div>
      );
    })}
  </div>
</section>

    </div>
  );
};

export default PensionDetailPage;
