import { useEffect, useState } from 'react';
import ReviewCard from '../../components/review/ReviewCard';
import { GetPensionsReviews } from '../../api/review';
import AllReviewHeader from '../../components/review/AllReviewHeader';

const AllReviews = () => {
  const [pensionsReviewData, setPensionsReviewData] = useState({ reviews: [] });

  const PensionsReview = async () => {
    try {
      const PensionsReviews = await GetPensionsReviews();

      console.log('장소 모든 리뷰 :', PensionsReviews);
      setPensionsReviewData(PensionsReviews);
    } catch (error) {
      console.error('장소 모든 리뷰 가져오기 실패 :', error);
      throw error;
    }
  };

  useEffect(() => {
    PensionsReview();
  }, []);

  return (
    <div className="container">
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
    </div>
  );
};

export default AllReviews;
