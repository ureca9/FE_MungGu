import { useEffect, useState } from 'react';
import ReviewCard from '../../components/review/ReviewCard';
import { GetPlaceReviews } from '../../api/review';
import { useParams } from 'react-router-dom';
import useTypeStore from '../../stores/review/useTypeStore';
import { useInView } from 'react-intersection-observer';
import AllReviewHeader from '../../components/review/AllReviewHeader';
const PlaceAllReview = () => {
  const { id: placeId } = useParams();
  const [reviews, setReviews] = useState([]);
  const { setPlaceId } = useTypeStore();

  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    setPlaceId(placeId);
  }, [placeId]);

  const fetchPlaceReviews = async (page) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await GetPlaceReviews(placeId, page);
      setReviews((prevReviews) => [...prevReviews, ...response.reviews]);
      setHasNext(response.hasNext);
      console.log('시설 리뷰 목록2 :', response);
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

export default PlaceAllReview;
