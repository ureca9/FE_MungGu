import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReservationRoomSection from '../../components/DetailPage/ReservationRoomSection';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import RecommendedFacility from '../../components/DetailPage/RecommendedFacility';
import ReviewDetailModal from '../../components/review/ReviewDetailModal';
import Swal from 'sweetalert2';
import SubHeader from '../../components/common/SubHeader';


const sliderSettings = {
  dots: false, 
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
  const scrollRef = useRef(null);
  const [pensionDetail, setPensionDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullIntro, setShowFullIntro] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    if (pensionDetail) {
      const watchedPlace = JSON.parse(localStorage.getItem('watched')) || [];
      const isExisting = watchedPlace.some((item) => item.pensionId === id);
      if (!isExisting) {
        const updatedWatched = [
          {
            pensionId: id,
            pensionName: pensionDetail.pensionName,
            image: pensionDetail.images[0],
            reviewAvg: pensionDetail.reviewAvg,
            reviewCount: pensionDetail.reviewCount,
            address: pensionDetail.address,
            introduction: pensionDetail.introduction,
          },
          ...watchedPlace,
        ].slice(0, 10);
        localStorage.setItem('watched', JSON.stringify(updatedWatched));
      }
    }
  }, [pensionDetail, id]);

  const toggleLike = async () => {
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      if (!accessToken) {
        const result = await Swal.fire({
          title: '로그인 후 이용해주세요.',
          icon: 'warning',
          showCancelButton: true, 
          confirmButtonText: '로그인',
          cancelButtonText: '취소',
          confirmButtonColor: '#3288FF',
        });
  
        if (result.isConfirmed) {
          navigate('/login');
        }
        return; 
      }

      const headers = {
        Accept: 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      };
  
      await axios.post(
        `https://meong9.store/api/v1/pensions/likes/${id}`,
        {},
        { headers },
      );
  
      setLikeStatus((prev) => !prev);
    } catch (error) {
      console.error('찜 상태 업데이트 실패:', error);
      Swal.fire({
        title: '찜 상태를 업데이트하는 중 문제가 발생했습니다.',
        icon: 'error',
      });
    }
  };

  useEffect(() => {
    const fetchPensionDetail = async () => {
      try {
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        const headers = { Accept: 'application/json' };

        if (accessToken) {
          headers.Authorization = `Bearer ${accessToken}`;
        }

        const response = await axios.get(
          `https://meong9.store/api/v1/pensions/detail/${id}`,
          { headers },
        );
        setPensionDetail(response.data.data);
        setLikeStatus(response.data.data.likeStatus || false); 
      } catch (error) {
        setError('펜션 정보를 불러오는 데 실패했습니다.');
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
  };

  const maxLines = 10;
  const introductionLines = pensionDetail.introduction.split('\n');

  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setIsReviewModalOpen(true);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      
      <SubHeader title={pensionDetail.pensionName || "펜션 상세" }/>
      
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

      <section className="p-4 mt-4 bg-white">
  <div className="flex items-center justify-between">
    <h2 className="text-lg font-bold">{pensionDetail.pensionName}</h2>
    <button
      onClick={toggleLike}
      className={`w-10 h-10 flex items-center justify-center rounded-full ${
        likeStatus ? 'text-red-500' : 'text-gray-400'
      }`}
    >
      {likeStatus ? '❤️' : '🤍'}
    </button>
  </div>
  <p className="text-sm text-gray-500">{pensionDetail.address}</p>
  <div className="flex items-center mt-2">
    <span className="mr-2 text-yellow-500">
      ⭐ {pensionDetail.reviewAvg}
    </span>
    <span className="text-sm text-gray-500">
      ({pensionDetail.reviewCount})
    </span>
  </div>
  <div className="flex flex-wrap gap-2 mt-2">
    {pensionDetail.tags.map((tag, index) => (
      <span
        key={index}
        className="px-3 py-1 text-sm bg-gray-200 rounded-full"
      >
        {tag}
      </span>
    ))}
  </div>
</section>


      <section className="p-4 mt-4 bg-white">
        <h3 className="mb-2 text-lg font-bold">소개글</h3>
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {showFullIntro
            ? pensionDetail.introduction
            : introductionLines.slice(0, maxLines).join('\n')}
        </p>
        {introductionLines.length > maxLines && (
          <button
            onClick={() => setShowFullIntro(!showFullIntro)}
            className="mt-2 text-sm text-blue-500"
          >
            {showFullIntro ? '접기' : '더보기'}
          </button>
        )}
      </section>

      <section className="p-4 mt-4 bg-white">
        <h3 className="mb-2 text-lg font-bold">예약 정보</h3>
        <p className="text-sm text-gray-500 whitespace-pre-line">
          {pensionDetail.limitInfo || '제한 정보가 없습니다.'}
        </p>
        <ReservationRoomSection pensionId={id} />
      </section>

      <section className="relative pr-4 pt-4 pb-4 mt-4 bg-white">
  <div className="flex items-center justify-between mb-2">
    <h3 className="pl-4 text-lg font-bold">리얼 포토 리뷰</h3>
    <button
      className="text-sm text-blue-500 hover:underline"
      onClick={() => navigate(`/pension-all-review/${id}`)}
    >
      전체보기 &gt;
    </button>
  </div>
  <div className="relative">
  <div className="flex gap-2 p-4 overflow-x-auto bg-white shadow-sm scrollbar-hidden">
      {pensionDetail.review.slice(0, 20).map((review, index) => {
        const firstFileUrl =
          review.file && review.file.length > 0
            ? review.file[0].fileUrl
            : null;
        const fileType =
          review.file && review.file.length > 0
            ? review.file[0].fileType
            : null;

        return (
          <div
            key={index}
            onClick={() => handleReviewClick(review)}
            className="flex-none p-2 rounded-lg shadow-md cursor-pointer w-36 bg-gray-50"
          >
            {fileType === 'IMAGE' ? (
              <img
                src={firstFileUrl || 'https://via.placeholder.com/150'}
                alt="리뷰 사진"
                className="object-cover w-full h-24 rounded-lg"
              />
            ) : fileType === 'VIDEO' ? (
              <video
                src={firstFileUrl}
                className="object-cover w-full h-24 rounded-lg"
                controls
              />
            ) : (
              <div className="flex items-center justify-center w-full h-24 bg-gray-200 rounded-lg">
                파일 없음
              </div>
            )}
            <p className="mt-2 text-sm font-bold truncate">
              {review.nickname}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {review.content.slice(0, 30)}...
            </p>
          </div>
        );
      })}
    </div>
  </div>
</section>



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
