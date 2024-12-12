import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../../components/review/ReviewCard";
import { GetPensionsReviews } from "../../api/review";
import AllReviewHeader from "../../components/review/AllReviewHeader";
import useAllReviewsStore from "../../stores/review/useAllReviewsStore";

const AllReviews = () => {
  const { id: pensionId } = useParams(); // URL에서 pensionId 가져오기
  const { pensionsReviewData, setPensionsReviewData } = useAllReviewsStore();

  const fetchPensionsReviews = async () => {
    try {
      const reviews = await GetPensionsReviews(pensionId); // 동적 ID 사용
      console.log("펜션 리뷰 목록 :", reviews);
      setPensionsReviewData(reviews);
    } catch (error) {
      console.error("리뷰 가져오기 실패 :", error);
    }
  };

  useEffect(() => {
    fetchPensionsReviews();
  }, [pensionId]);

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

export default AllReviews;
