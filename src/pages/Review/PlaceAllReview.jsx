import { useEffect } from 'react';
import AllReviewHeader from '../../components/review/AllReviewHeader';
import ReviewCard from '../../components/review/ReviewCard';
import { GetPlaceReviews } from '../../api/review';
import { useParams } from 'react-router-dom';
import useAllReviewsStore from '../../stores/review/useAllReviewsStore';

const PlaceAllReview = () => {
  const { id: placeId } = useParams();
  const { pensionsReviewData, setPensionsReviewData } = useAllReviewsStore();

  const fetchPlaceReviews = async () => {
    try {
      const reviews = await GetPlaceReviews(placeId);
      console.log('시설 리뷰 목록 :', reviews);
      setPensionsReviewData(reviews);
    } catch (error) {
      console.error('시설 리뷰 가져오기 실패 :', error);
    }
  };

  useEffect(() => {
    fetchPlaceReviews();
  }, [placeId]);

  return (
    <div className="flex flex-col w-full">
      <div className="px-6 pt-6">
        <AllReviewHeader />
      </div>
      <div className="h-2 mt-1 mb-5 bg-[#D9D9D9]"></div>
      <div className="flex flex-col w-full gap-3 px-6">
        {pensionsReviewData.reviews.map((review, index) => (
          <div key={index}>
            <ReviewCard key={index} review={review} />
            <div className="mt-3 h-1 bg-[#D9D9D9] "></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceAllReview;
