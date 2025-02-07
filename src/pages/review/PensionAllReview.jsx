import { lazy, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetPensionsReviews } from '../../api/review';
// import ReviewCard from '../../components/review/ReviewCard';
import useTypeStore from '../../stores/review/useTypeStore';
import AllReviewHeader from '../../components/review/AllReviewHeader';
import { useInView } from 'react-intersection-observer';
import SubHeader from '../../components/common/SubHeader';
import { debounce } from 'lodash';
const ReviewCard = lazy(() => import('../../components/review/ReviewCard'));
const PensionAllReview = () => {
  const { id: pensionId } = useParams();
  const { setPensionId } = useTypeStore();
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    setPensionId(pensionId);
  }, []);

  const fetchPensionsReviews = async (page) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await GetPensionsReviews(pensionId, page);
      setReviews((prevReviews) => [...prevReviews, ...response.reviews]);
      setHasNext(response.hasNext);
    } catch (error) {
      console.error('리뷰 가져오기 실패 :', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPensionsReviews(page);
  }, [pensionId, page]);

  const handlePageChange = debounce(() => {
    if (inView && hasNext && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 1000);

  useEffect(() => {
    handlePageChange();
  }, [inView, hasNext, isLoading]);

  return (
    <div className="min-h-screen">
      <SubHeader title={'펜션 리뷰 전체보기'} />

      <div className="flex flex-col min-w-96 md:w-full">
        <AllReviewHeader />
        <div className="h-2 mt-1 mb-5 bg-[#D9D9D9]"></div>
        <div className="flex flex-col gap-3 px-5 min-w-96 md:w-full md:px-6">
          {reviews.map((review, index) => (
            <Suspense
              fallback={<div>리뷰를 불러오는 중입니다...</div>}
              key={index}
            >
              <div>
                <ReviewCard review={review} />
                <div className="mt-3 h-1 bg-[#D9D9D9]"></div>
              </div>
            </Suspense>
          ))}
          {isLoading && <div>Loading...</div>}
          <div ref={ref} className="h-4 root"></div>
        </div>
      </div>
    </div>
  );
};

export default PensionAllReview;
