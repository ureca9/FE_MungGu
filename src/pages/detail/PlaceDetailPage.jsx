import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Slider from 'react-slick';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [likeStatus, setLikeStatus] = useState(false);

  // 최근본 목록 만드는 코드 시작 -은석-
  useEffect(() => {
    if (placeDetail) {
      const watchedPlace = JSON.parse(localStorage.getItem('watched')) || [];
      const isExisting = watchedPlace.some((item) => item.placeid === id);
      if (!isExisting) {
        const updatedWatched = [
          {
            placeid: id,
            placeName: placeDetail.placeName,
            image: placeDetail.images[0],
            reviewAvg: placeDetail.reviewAvg,
            reviewCount: placeDetail.reviewCount,
            address: placeDetail.address,
            businessHour: placeDetail.businessHour,
            closedDays: placeDetail.closedDays,
            description: placeDetail.description,
          },
          ...watchedPlace,
        ].slice(0, 20);
        localStorage.setItem('watched', JSON.stringify(updatedWatched));
      }
    }
  }, [placeDetail, id]); // 최근본 목록 만드는 코드 끝 -은석-

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

  // 리뷰 클릭 핸들러
  const handleReviewClick = (review) => {
    setSelectedReview({
      reviewId: review.reviewId,
      content: review.content,
      nickname: review.nickname,
      score: review.score,
      visitDate: review.visitDate,
      file: review.file || [],
      profileImageUrl: review.profileImageUrl,
    });
    setIsModalOpen(true);
  };

  const handleViewAllReviews = () => {
    navigate(`/place-all-review/${id}`);
  };

  // 찜 상태 업데이트 함수 (장소용 API 엔드포인트로 요청)
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

      // 장소의 찜 업데이트 엔드포인트 (예시)
      await axios.post(
        `https://meong9.store/api/v1/places/likes/${id}`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );

      // 서버 요청 성공 시 로컬 상태 업데이트
      setLikeStatus((prev) => !prev);
      setPlaceDetail((prev) => ({ ...prev, likeStatus: !prev.likeStatus }));
    } catch (error) {
      Swal.fire({
        title: '찜 상태를 업데이트하는 중 문제가 발생했습니다.',
        icon: 'error',
      });
    }
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
