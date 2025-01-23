import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SubHeader from '../../components/common/SubHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import PlaceHeader from '../../components/detail-page/PlaceHeader';
import PlaceInfoSection from '../../components/detail-page/PlaceInfoSection';
import PlaceReviewSection from '../../components/detail-page/PlaceReviewSection';
import ReviewDetailModal from '../../components/review/ReviewDetailModal';
import emptyIcon from "../../assets/common/petgray.svg";
import Slider from 'react-slick';

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
  const [placeDetail, setPlaceDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaceDetail = async () => {
      try {
        const response = await axios.get(`https://meong9.store/api/v1/places/detail/${id}`);
        setPlaceDetail(response.data.data);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaceDetail();
  }, [id]);

  // 리뷰 클릭 핸들러 추가
  const handleReviewClick = (review) => {
    setSelectedReview({
      reviewId: review.reviewId || null,
      content: review.content || '내용 없음',
      nickname: review.nickname || '알 수 없음',
      score: review.score || 0,
      visitDate: review.visitDate || '방문 날짜 없음',
      file: review.file || [],
      profileImageUrl: review.profileImageUrl || null,
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
        onToggleLike={() => setPlaceDetail((prev) => ({ ...prev, likeStatus: !prev.likeStatus }))}
        reviewAvg={placeDetail.reviewAvg}
        reviewCount={placeDetail.reviewCount}
        tags={placeDetail.tags}
      />

      <PlaceInfoSection 
        businessHour={placeDetail.businessHour} 
        telNo={placeDetail.telNo} 
        hmpgUrl={placeDetail.hmpgUrl} 
        description={placeDetail.description} 
      />

      <PlaceReviewSection 
        photoReviewList={placeDetail.photoReviewList} 
        review={placeDetail.review} 
        handleReviewClick={handleReviewClick}
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
