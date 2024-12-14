import { useEffect, useState } from 'react';
import ReviewCard from '../../components/review/ReviewCard';
import { GetPlaceReviews } from '../../api/review';
import { useParams } from 'react-router-dom';
import useTypeStore from '../../stores/review/useTypeStore';
import { useInView } from 'react-intersection-observer';
import AllReviewHeader from '../../components/review/AllReviewHeader';
const PlaceAllReview = () => {
  const { id: placeId } = useParams();
  // const { pensionsReviewData, setPensionsReviewData } = useAllReviewsStore();
  const [pensionsReviewData, setPensionsReviewData] = useState({
    reviews: [],
    totalPages: 1,
  });
  const { setPlaceId } = useTypeStore();

  const [page, setPage] = useState(0); // 페이지 번호 상태 추가
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const { ref, inView } = useInView({ rootMargin: '200px' }); // Intersection Observer 훅 사용

  useEffect(() => {
    setPlaceId(placeId);
  }, []);

  const fetchPlaceReviews = async (page) => {
    if (isLoading) return; // 이미 로딩 중이면 함수 종료
    setIsLoading(true);
    try {
      const reviews = await GetPlaceReviews(placeId, page);
      console.log('시설 리뷰 목록 :', reviews);
      setPensionsReviewData((prevData) => ({
        ...prevData,
        reviews: [...prevData.reviews, ...reviews.reviews], // 기존 리뷰에 새로운 리뷰 추가
        totalPages: reviews.totalPages, // 전체 페이지 수 업데이트
      }));
      console.log('추가 시설', pensionsReviewData.totalPages);
      console.log('시설 리뷰 목록2 :', reviews);
    } catch (error) {
      console.error('시설 리뷰 가져오기 실패 :', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaceReviews(page);
  }, [placeId, page]);

  useEffect(() => {
    if (inView && pensionsReviewData.totalPages > page + 1) {
      setPage((prevPage) => prevPage + 1);
    }
    console.log('추가 페이지', page);
  }, [inView, page, pensionsReviewData.totalPages]);

  return (
    <div className="flex flex-col min-w-96 sm:w-full">
      <AllReviewHeader />
      <div className="h-2 mt-1 mb-5 bg-[#D9D9D9]"></div>
      <div className="flex flex-col gap-3 px-2 min-w-96 sm:w-full sm:px-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          pensionsReviewData.reviews.map((review, index) => (
            <div key={index}>
              <ReviewCard key={index} review={review} />
              <div className="mt-3 h-1 bg-[#D9D9D9] "></div>
            </div>
          ))
        )}
        {isLoading && <div>Loading...</div>}
        <div ref={ref} className="root"></div>
      </div>
    </div>
  );
};

export default PlaceAllReview;
