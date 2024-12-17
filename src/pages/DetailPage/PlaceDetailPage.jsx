import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Swal from 'sweetalert2';
import ReviewDetailModal from '../../components/review/ReviewDetailModal'; // 리뷰 모달 추가
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';


const PlaceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [placeDetail, setPlaceDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likeStatus, setLikeStatus] = useState(false);

  // 리뷰 모달 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  // 리뷰 클릭 시 모달 열기
  const handleReviewClick = (review) => {
    setSelectedReview({
      reviewId: review.reviewId || null,
      content: review.content || '',
      nickname: review.nickname || '알 수 없음',
      score: review.score || 0,
      visitDate: review.visitDate || '방문 날짜 없음',
      file: review.file || [],
      profileImageUrl: review.profileImageUrl || null,
    });
    setIsModalOpen(true);
  };

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
        ].slice(0, 10);
        localStorage.setItem('watched', JSON.stringify(updatedWatched));
      }
    }
  }, [placeDetail, id]);

  const fetchPlaceDetail = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      const headers = {
        Accept: 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      };

      const response = await axios.get(
        `https://meong9.store/api/v1/places/detail/${id}`,
        { headers }
      );

      const data = response.data.data || {};
      setPlaceDetail({
        placeName: data.placeName || '정보 없음',
        address: data.address || '정보 없음',
        reviewCount: data.reviewCount || 0,
        reviewAvg: data.reviewAvg || 0,
        tags: data.tags || [],
        businessHour: data.businessHour || '정보 없음',
        telNo: data.telNo || '정보 없음',
        hmpgUrl: data.hmpgUrl || null,
        description: data.description || '정보 없음',
        images: data.images || [],
        photoReviewList: data.photoReviewList || [],
        review: data.review || [],
      });
      setLikeStatus(data.likeStatus || false);
    } catch (error) {
      if (error.response?.status === 404) {
        setError(error.response.data?.message || '데이터를 찾을 수 없습니다.');
      } else {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async () => {
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      };

      await axios.post(
        `https://meong9.store/api/v1/places/likes/${id}`,
        {},
        { headers }
      );

      setLikeStatus((prevStatus) => !prevStatus);
    } catch (error) {
      console.error('찜 상태 업데이트 실패:', error);
      Swal.fire({
        title: '찜 상태를 업데이트하는 중 문제가 발생했습니다.',
        icon: 'error',
      });
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
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg"
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
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center p-4 bg-white shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-lg text-gray-600"
        >
          {'<'}
        </button>
      </header>

      <div className="w-full h-80">
      <Slider
  dots={false} // 하단 네비게이션 점 비활성화
  infinite={images.length > 1} // 이미지가 2개 이상일 때만 무한 스크롤
  speed={500} // 슬라이더 전환 속도
  slidesToShow={1} // 한 번에 보여줄 슬라이드 개수
  slidesToScroll={1} // 한 번에 스크롤할 슬라이드 개수
  arrows={images.length > 1} // 이미지가 2개 이상일 때만 화살표 표시
>
  {images.length > 0 ? (
    images.map((image, index) => (
      <div key={index} className="w-full h-80 bg-gray-300">
        <img
          src={image}
          alt={`${placeName} 이미지 ${index + 1}`}
          className="object-cover w-full h-full"
        />
      </div>
    ))
  ) : (
    <div className="w-full h-48 bg-gray-300">
      <img
        src="https://via.placeholder.com/800x300"
        alt="기본 이미지"
        className="object-cover w-full h-full"
      />
    </div>
  )}
</Slider>

</div>

      <section className="p-4 bg-white">
        <h2 className="text-lg font-bold">{placeName}</h2>
        <p className="mb-2 text-sm text-gray-600">{address}</p>
        <div className="flex items-center mb-4 space-x-2">
          <span className="text-sm text-yellow-500">
            ⭐ {reviewAvg} ({reviewCount} 리뷰)
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 text-sm bg-gray-200 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="p-4 mt-4 bg-white">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-bold">리얼 포토 리뷰</h3>
    <button
      className="text-sm text-blue-500 hover:underline"
      onClick={() => navigate(`/place-all-review/${id}`)}
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
          className="flex-none p-2 text-center rounded-lg shadow-md w-36 bg-gray-50 cursor-pointer"
          onClick={() =>
            handleReviewClick({
              reviewId: photoReview.reviewId,
              content: matchingReview?.content || '리뷰 내용 없음',
              nickname: matchingReview?.nickname || '작성자 없음',
              score: matchingReview?.score || 0,
              visitDate: matchingReview?.visitDate || '방문 날짜 없음',
              file: matchingReview?.file || [],
              profileImageUrl: matchingReview?.profileImageUrl || null,
            })
          }
        >
          <img
            src={
              photoReview.representativeImageUrl ||
              'https://via.placeholder.com/150'
            }
            alt="포토 리뷰"
            className="object-cover w-full h-24 mb-2 rounded-lg"
          />
          <p className="text-sm font-bold truncate">
            {matchingReview?.nickname || '작성자 없음'}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {matchingReview?.content || '리뷰 내용 없음'}
          </p>
        </div>
      );
    })}
  </div>
</section>

      {/* 리뷰 모달 */}
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
