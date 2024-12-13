import { useEffect, useState } from 'react';
// import AllReviewHeader from '../../components/review/AllReviewHeader';
import ReviewCard from '../../components/review/ReviewCard';
import { GetPlaceReviews, GetPlacesSummary } from '../../api/review';
import { useNavigate, useParams } from 'react-router-dom';
import useAllReviewsStore from '../../stores/review/useAllReviewsStore';
import { FaPenAlt } from 'react-icons/fa';
import { RxStarFilled } from 'react-icons/rx';
import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';
import useTypeStore from '../../stores/review/useTypeStore';

const PlaceAllReview = () => {
  const { id: placeId } = useParams();
  const [summary, setSummary] = useState({});
  const navigate = useNavigate();
  const { pensionsReviewData, setPensionsReviewData } = useAllReviewsStore();
  const { placeType, setPlcPenIdType, setPlaceId } = useTypeStore();

  useEffect(() => {
    setPlaceId(placeId);
  }, []);

  useEffect(() => {
    const type = location.pathname.includes('pension') ? '020' : '010';
    setPlcPenIdType(type);
    console.log('PlcPenIdType:', type);
  }, []);

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

  useEffect(() => {
    const placeSummary = async () => {
      try {
        const response = await GetPlacesSummary(placeId);
        console.log('시설 요약 응답 :', response);
        setSummary(response.data);
        console.log('type 시설:', placeType);
      } catch (error) {
        console.error('시설 요약 오류 :', error);
      }
    };

    placeSummary();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="px-6 pt-6">
        <div className="flex justify-between">
          <h1 className="flex text-xl font-semibold">{summary.pensionName}</h1>
          <div className="flex">
            <CRUDBtn
              styleType="blue"
              size="lg"
              label="글 작성"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/review-add/${placeId}`);
              }}
            />
          </div>
        </div>
        <div className="flex border items-center justify-center flex-col border-[#8A8A8A] h-28 rounded-lg my-4">
          <div className="flex items-center">
            <span className="text-[#FDBD00] mr-2 text-3xl">
              <RxStarFilled />
            </span>
            <span className="text-4xl font-bold">{summary.reviewAvg}</span>
            <span className="flex items-end text-xl h-full text-[#8A8A8A]">
              /5
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-[#8A8A8A]">
              <FaPenAlt />
            </span>
            <span className="ml-2 text-[#3288FF] ">
              {summary.reviewCount}명
            </span>
            <span className="text-[#8A8A8A]">이 리뷰를 남겨주셨습니다.</span>
          </div>
        </div>
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
