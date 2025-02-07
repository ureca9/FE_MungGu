import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import Swal from 'sweetalert2';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SubHeader from '../../components/common/SubHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import PlaceHeader from '../../components/detail-page/PlaceHeader';
import PlaceInfoSection from '../../components/detail-page/PlaceInfoSection';
import PlaceReviewSection from '../../components/detail-page/PlaceReviewSection';
import ReviewDetailModal from '../../components/review/ReviewDetailModal';
import ViewerCount from '../../components/detail-page/ViewerCount';
import emptyIcon from '../../assets/common/petgray.svg';

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
  const [likeStatus, setLikeStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const getPlaceDetail = async () => {
      try {
        const data = await fetchPlaceDetail(id);
        setPlaceDetail(data);
        setLikeStatus(data.likeStatus || false);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };
  
    getPlaceDetail();
  }, [id]);
  

  const handleToggleLike = async () => {
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      if (!accessToken) {
        const result = await Swal.fire({
          title: '로그인 후 이용해주세요.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: '로그인',
          cancelButtonText: '취소',
        });

        if (result.isConfirmed) {
          navigate('/login');
        }
        return;
      }

      await axios.post(
        `https://meong9.store/api/v1/places/likes/${id}`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setLikeStatus((prev) => !prev);
      setPlaceDetail((prev) => ({ ...prev, likeStatus: !prev.likeStatus }));
    } catch (error) {
      console.error('찜 상태 업데이트 실패:', error);
      Swal.fire({
        title: '찜 상태를 업데이트하는 중 문제가 발생했습니다.',
        icon: 'error',
      });
    }
  };

  const handleReviewClick = (review) => {
    setSelectedReview(review);
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
        likeStatus={likeStatus}
        onToggleLike={handleToggleLike}
        reviewAvg={placeDetail.reviewAvg}
        reviewCount={placeDetail.reviewCount}
        tags={placeDetail.tags}
      />

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
