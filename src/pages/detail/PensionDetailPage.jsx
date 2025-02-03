import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // 이 줄 추가
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Swal from 'sweetalert2';

import LoadingSpinner from '../../components/common/LoadingSpinner';
import RecommendedFacility from '../../components/detail-page/RecommendedFacility';
import ReviewSection from '../../components/detail-page/ReviewSection';
import ReviewDetailModal from '../../components/review/ReviewDetailModal';
import SubHeader from '../../components/common/SubHeader';
import PensionHeader from '../../components/detail-page/PensionHeader';
import PensionIntroduction from '../../components/detail-page/PensionIntroduction';
import ReservationRoomSection from '../../components/detail-page/ReservationRoomSection';
import ViewerCount from '../../components/detail-page/ViewerCount';

import { fetchPensionDetail } from '../../api/detail-page/pension-detail-page';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const PensionDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pensionDetail, setPensionDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likeStatus, setLikeStatus] = useState(false);
  const [showFullIntro, setShowFullIntro] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchPensionDetail(id);
        setPensionDetail(data);
        setLikeStatus(data.likeStatus || false);
      } catch (err) {
        setError('펜션 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setIsReviewModalOpen(true);
  };

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

      await axios.post(`https://meong9.store/api/v1/pensions/likes/${id}`, {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setLikeStatus((prev) => !prev);
    } catch (error) {
      Swal.fire({
        title: '찜 상태를 업데이트하는 중 문제가 발생했습니다.',
        icon: 'error',
      });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!pensionDetail) return <div className="p-4">유효한 펜션 정보가 없습니다.</div>;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <SubHeader title={pensionDetail?.pensionName || '펜션 상세'} />

      <div className="w-full h-[400px] overflow-hidden">
        {pensionDetail?.images?.length > 0 ? (
          <Slider {...sliderSettings}>
            {pensionDetail.images.slice(0, 5).map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`펜션 이미지 ${index + 1}`}
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

      <PensionHeader 
        pensionName={pensionDetail.pensionName} 
        address={pensionDetail.address} 
        likeStatus={likeStatus} 
        onToggleLike={handleToggleLike} 
        tags={pensionDetail.tags || []}
        reviewAvg={pensionDetail.reviewAvg}
        reviewCount={pensionDetail.reviewCount}
      />

      {pensionDetail.viewCount != null && (
        <ViewerCount viewCount={pensionDetail.viewCount} />
      )}

      <PensionIntroduction 
        introduction={pensionDetail.introduction} 
        showFullIntro={showFullIntro} 
        setShowFullIntro={setShowFullIntro} 
      />

      <ReservationRoomSection pensionId={id} />

      <ReviewSection 
        reviews={pensionDetail.review} 
        onReviewClick={handleReviewClick} 
        pensionId={id} 
      />

      <RecommendedFacility pensionId={id} />

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
