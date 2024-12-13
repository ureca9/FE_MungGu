import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAllReviewsStore from '../../stores/review/useAllReviewsStore';
import {
  GetPensionsReviews,
  GetPensionsSummary,
  GetPlacesSummary,
} from '../../api/review';
import ReviewCard from '../../components/review/ReviewCard';
import useTypeStore from '../../stores/review/useTypeStore';
import { RxStarFilled } from 'react-icons/rx';
import { FaPenAlt } from 'react-icons/fa';
import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';

const PensionAllReview = () => {
  const { id: pensionId } = useParams();
  const [summary, setSummary] = useState({});
  const navigate = useNavigate();
  const { pensionsReviewData, setPensionsReviewData } = useAllReviewsStore();
  const { pensionType, setPlcPenIdType, setPensionId } = useTypeStore();
  // const [typePensionID] = useState(location.pathname.includes('pension'));//시설인지 펜션인지 확인
  const location = useLocation();

  useEffect(() => {
    setPensionId(pensionId);
  }, []);

  useEffect(() => {
    const type = location.pathname.includes('pension') ? '020' : '010';
    setPlcPenIdType(type);
    console.log('PlcPenIdType:', type);
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

  useEffect(() => {
    const pensionsSummary = async () => {
      try {
        const response = await GetPensionsSummary(pensionId);
        console.log('편션 요약 응답 :', response);
        setSummary(response.data);
        console.log('type 편션:', pensionType);
      } catch (error) {
        console.error('펜션 요약 오류 :', error);
      }
    };

    pensionsSummary();
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
                navigate(`/review-add/${pensionId}`);
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

export default PensionAllReview;
