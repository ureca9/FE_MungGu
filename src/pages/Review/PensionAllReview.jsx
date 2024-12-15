import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetPensionsReviews } from '../../api/review';
import ReviewCard from '../../components/review/ReviewCard';
import useTypeStore from '../../stores/review/useTypeStore';
import AllReviewHeader from '../../components/review/AllReviewHeader';
import { useInView } from 'react-intersection-observer';

const PensionAllReview = () => {
  const { id: pensionId } = useParams();
  const { setPensionId } = useTypeStore();
  const [reviews, setReviews] = useState([]);

  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  // const observerRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    setPensionId(pensionId);
  }, []);

  const fetchPensionsReviews = async (page) => {
    if (isLoading) return;
    try {
      const response = await GetPensionsReviews(pensionId, page);
      setReviews((prevReviews) => [...prevReviews, ...response.reviews]);
      setHasNext(response.hasNext);
      console.log('펜션 리뷰 목록 :', reviews);
    } catch (error) {
      console.error('리뷰 가져오기 실패 :', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPensionsReviews(page);
  }, [pensionId, page]);

  useEffect(() => {
    if (inView && hasNext && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
    console.log('inView', inView);
  }, [inView, !isLoading, hasNext]);

  return (
    <div className="flex flex-col min-w-96 sm:w-full">
      <AllReviewHeader />
      <div className="h-2 mt-1 mb-5 bg-[#D9D9D9]"></div>
      <div className="flex flex-col gap-3 px-2 min-w-96 sm:w-full sm:px-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          reviews.map((review, index) => (
            <div key={index}>
              <ReviewCard key={index} review={review} />
              <div className="mt-3 h-1 bg-[#D9D9D9] "></div>
            </div>
          ))
        )}
        {isLoading && <div>Loading...</div>}
        <div ref={ref} className="h-4 root"></div>
      </div>
    </div>
  );
};

export default PensionAllReview;
