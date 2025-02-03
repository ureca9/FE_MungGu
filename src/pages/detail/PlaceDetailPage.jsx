// src/pages/PlaceDetailPage.js (또는 해당 컴포넌트가 위치한 경로)
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SubHeader from '../../components/common/SubHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import PlaceHeader from '../../components/detail-page/PlaceHeader';
import PlaceInfoSection from '../../components/detail-page/PlaceInfoSection';
import PlaceReviewSection from '../../components/detail-page/PlaceReviewSection';
import ReviewDetailModal from '../../components/review/ReviewDetailModal';
import emptyIcon from "../../assets/common/petgray.svg";
import Slider from 'react-slick';
import ViewerCount from '../../components/detail-page/ViewerCount';

// API 호출 함수를 import 합니다.
import { fetchPlaceDetail } from '../../api/detail-page/place-detail-page';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const PlaceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [placeDetail, setPlaceDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const getPlaceDetail = async () => {
      try {
        const data = await fetchPlaceDetail(id);
        setPlaceDetail(data);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    getPlaceDetail();
  }, [id]);

  // 리뷰 클릭 핸들러 (PensionDetailPage와 동일하게)
  const handleReviewClick = (review) => {
    setSelectedReview({
      reviewId: review.reviewId,
      content: review.content,
      nickname: review.nickname,
      score: review.score,
      visitDate: review.visitDate,
      // review.file이 undefined인 경우 빈 배열로 대체
      file: review.file || [],
      profileImageUrl: review.profileImageUrl,
    });
    setIsModalOpen(true);
  };

  const handleViewAllReviews = () => {
    navigate(`/place-all-review/${id}`);
  };

  if (loading) return <LoadingSpinner />;
  if (!placeDetail) return <div>데이터를 찾을 수 없습니다.</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <SubHeader title={placeDetail.placeName} />

      {/* 이미지 슬라이더 섹션 */}
      <div className="w-full h-[400px] overflow-hidden">
        {placeDetail?.images?.length > 0 ? (
          <Slider {...sliderSettings}>
            {placeDetail.images.slice(0, 5).map((image, index) => (
              <div key={index}>
                <img 
                  src={image} 
                  alt={`장소 이미지 ${index + 1}`} 
                  className="w-full h-[400px] object-cover" 
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="flex items-center justify-center w-full h-[400px] bg-gray-300 text-gray-500">
            이미지가 없습니다.
          </div>
        )}
      </div>

      <PlaceHeader
        placeName={placeDetail.placeName}
        address={placeDetail.address}
        likeStatus={placeDetail.likeStatus}
        onToggleLike={() =>
          setPlaceDetail((prev) => ({ ...prev, likeStatus: !prev.likeStatus }))
        }
        reviewAvg={placeDetail.reviewAvg}
        reviewCount={placeDetail.reviewCount}
        tags={placeDetail.tags}
      />

      {/* viewCount가 null이 아닐 경우에만 ViewerCount 컴포넌트 렌더링 */}
      {placeDetail.viewCount != null && (
        <ViewerCount viewCount={placeDetail.viewCount} />
      )}

      <PlaceInfoSection 
        businessHour={placeDetail.businessHour} 
        telNo={placeDetail.telNo} 
        hmpgUrl={placeDetail.hmpgUrl} 
        description={placeDetail.description} 
      />

      <PlaceReviewSection 
        photoReviewList={placeDetail.photoReviewList} 
        review={placeDetail.review} 
        // 부모에서 handleReviewClick 함수를 onReviewClick prop으로 전달하는 경우,
        // PlaceReviewSection 내부에서 해당 prop 이름으로 호출하도록 구현되어 있어야 합니다.
        onReviewClick={handleReviewClick}
        emptyIcon={emptyIcon} 
        onViewAllClick={handleViewAllReviews}
      />

      {isModalOpen && (
        <ReviewDetailModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          reviewData={selectedReview} 
        />
      )}
    </div>
  );
};

export default PlaceDetailPage;
