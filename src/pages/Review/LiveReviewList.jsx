import { useRef, useState } from 'react';
import ReviewCard from '../../components/review/ReviewCard';

const LiveReviewList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const ref = useRef(null);

  return (
    <div className="flex flex-col min-w-96 sm:w-full">
      <h1>실시간 리뷰</h1>
      <div className="h-2 mt-1 mb-5 bg-[#D9D9D9]"></div>
      <div className="flex flex-col gap-3 px-2 min-w-96 sm:w-full sm:px-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          reviews.map((review) => (
            <div key={review.id}>
              <ReviewCard review={review} />
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

export default LiveReviewList;
