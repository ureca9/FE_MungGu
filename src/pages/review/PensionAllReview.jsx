import { lazy, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetPensionsReviews } from '../../api/review';
import useTypeStore from '../../stores/review/useTypeStore';
import AllReviewHeader from '../../components/review/AllReviewHeader';
import { useInView } from 'react-intersection-observer';
import SubHeader from '../../components/common/SubHeader';
import { throttle } from 'lodash';
import { CircularProgress } from '@mui/material';
const ReviewCard = lazy(() => import('../../components/review/ReviewCard'));
const PensionAllReview = () => {
  const { id: pensionId } = useParams();
  const { setPensionId } = useTypeStore();
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [hasInitialLoad, setHasInitialLoad] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.8,
    triggerOnce: false,
  });

  const scrollRef = useRef(null);

  useEffect(() => {
    setPensionId(pensionId);
  }, [pensionId, setPensionId]);

  const fetchPensionsReviews = useCallback(
    async (pageToFetch) => {
      if (isLoading) return;
      setIsLoading(true);
      try {
        const response = await GetPensionsReviews(pensionId, pageToFetch);
        setReviews((prevReviews) => [...prevReviews, ...response.reviews]);
        setHasNext(response.hasNext);
        // console.log('fetchPlaceReviews response: ', response);
      } catch (error) {
        console.error('시설 리뷰 가져오기 실패 :', error);
      } finally {
        setIsLoading(false);
      }
    },
    [pensionId, isLoading],
  );

  useEffect(() => {
    const loadInitialData = async () => {
      if (hasInitialLoad) return;
      if (scrollRef.current && localStorage.getItem('scrollPosition')) {
        scrollRef.current.scrollTop = localStorage.getItem('scrollPosition');
      }
      await fetchPensionsReviews(0);
      setHasInitialLoad(true);
    };
    loadInitialData();
  }, [fetchPensionsReviews]);

  const handlePageChange = useCallback(() => {
    if (inView && hasNext && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  const throttledPageChange = useCallback(throttle(handlePageChange, 1000), [
    handlePageChange,
  ]);

  useEffect(() => {
    if (hasInitialLoad) {
      throttledPageChange();
    }
  }, [throttledPageChange, hasInitialLoad]);

  useEffect(() => {
    if (page > 0) {
      fetchPensionsReviews(page);
    }
  }, [page]);

  return (
    <div className="min-h-screen">
      <SubHeader title={'펜션 리뷰 전체보기'} />

      <div className="flex flex-col min-w-96 md:w-full">
        <AllReviewHeader />
        <div className="h-2 mt-1 mb-5 bg-[#D9D9D9]"></div>
        <div className="flex flex-col gap-3 px-5 min-w-96 md:w-full md:px-6">
          {isLoading && reviews.length === 0 ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <CircularProgress size={60} />
            </div>
          ) : (
            reviews.map((review, index) => (
              <div key={index}>
                <ReviewCard review={review} />
                <div className="mt-3 h-1 bg-[#D9D9D9]"></div>
              </div>
            ))
          )}
          <div ref={ref} className="h-6 root"></div>
        </div>
      </div>
    </div>
  );
};

export default PensionAllReview;
