import { RxStarFilled } from 'react-icons/rx';
import { FaPenAlt } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';
import { GetPensionsSummary, GetPlacesSummary } from '../../api/review';
import useTypeStore from '../../stores/review/useTypeStore';

const AllReviewHeader = () => {
  const navigate = useNavigate();
  const { id: pensionId } = useParams();
  const { id: placeId } = useParams();
  const [summary, setSummary] = useState({});
  const location = useLocation();

  const { plcPenType, setPlcPenIdType } = useTypeStore();

  useEffect(() => {
    const type = location.pathname.includes('pension') ? '020' : '010';
    setPlcPenIdType(type);
    console.log('PlcPenIdType:', type);
  }, []);

  const pensionsSummary = async () => {
    try {
      const response = await GetPensionsSummary(pensionId);
      setSummary(response.data);
    } catch (error) {
      console.error('펜션 요약 오류 :', error);
    }
  };

  const placeSummary = async () => {
    try {
      const response = await GetPlacesSummary(placeId);
      setSummary(response.data);
    } catch (error) {
      console.error('시설 요약 오류 :', error);
    }
  };

  useEffect(() => {
    plcPenType === '020' ? pensionsSummary() : placeSummary();
  }, [plcPenType]);

  return (
    <div className="p-2 sm:p-6 sm:pb-2">
      <div className="flex justify-between">
        <h1 className="w-full text-xl font-semibold line-clamp-1">
          {summary.pensionName}
        </h1>
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
      <div className="flex border items-center justify-center flex-col border-[#8A8A8A] h-24 sm:h-32 rounded-lg my-1 sm:my-4">
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
          <span className="ml-2 text-lg text-[#3288FF] ">
            {summary.reviewCount}명
          </span>
          <span className="text-lg text-[#8A8A8A]">
            이 리뷰를 남겨주셨습니다.
          </span>
        </div>
      </div>
    </div>
  );
};

export default AllReviewHeader;
