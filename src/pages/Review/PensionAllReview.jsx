import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAllReviewsStore from '../../stores/review/useAllReviewsStore';
import { GetPensionsReviews } from '../../api/review';
import ReviewCard from '../../components/review/ReviewCard';
import useTypeStore from '../../stores/review/useTypeStore';
import AllReviewHeader from '../../components/review/AllReviewHeader';

const PensionAllReview = () => {
  const { id: pensionId } = useParams();
  const { pensionsReviewData, setPensionsReviewData } = useAllReviewsStore();
  const { setPensionId } = useTypeStore();

  useEffect(() => {
    setPensionId(pensionId);
  }, []);

  const fetchPensionsReviews = async () => {
    try {
      const reviews = await GetPensionsReviews(pensionId);
      console.log('펜션 리뷰 목록 :', reviews);
      setPensionsReviewData(reviews);
    } catch (error) {
      console.error('리뷰 가져오기 실패 :', error);
    }
  };

  useEffect(() => {
    fetchPensionsReviews();
  }, [pensionId]);

  return (
    <div className="flex flex-col min-w-96 sm:w-full">
      <AllReviewHeader />
      <div className="h-2 mt-1 mb-5 bg-[#D9D9D9]"></div>
      <div className="flex flex-col gap-3 px-2 min-w-96 sm:w-full sm:px-6">
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

export default PensionAllReview;
