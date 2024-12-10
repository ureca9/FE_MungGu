import { RxStarFilled } from 'react-icons/rx';
import { FaPenAlt } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';
import { GetPensionsSummary, GetPlacesSummary } from '../../api/review';
import useTypeStore from '../../stores/review/useTypeStore';

const AllReviewHeader = ({ typePensionID }) => {
  const navigate = useNavigate();
  const { id: pensionId } = useParams();
  const { id: placeId } = useParams();
  const [summary, setSummary] = useState({});
  const location = useLocation();

  const { typePension, setTypePension } = useTypeStore(); //시설 장소 타입
  useEffect(() => {
    setTypePension(location.pathname.includes('pension'));
  }, [location.pathname, setTypePension]);

  const pensionsSummary = async () => {
    try {
      const response = await GetPensionsSummary(pensionId);
      console.log('편션 요약 응답 :', response);
      setSummary(response.data);
      console.log('type 편션:', typePension);
    } catch (error) {
      console.error('펜션 요약 오류 :', error);
    }
  };

  const placeSummary = async () => {
    try {
      const response = await GetPlacesSummary(placeId);
      console.log('시설 요약 응답 :', response);
      setSummary(response.data);
      console.log('type 편션:', typePension);
    } catch (error) {
      console.error('시설 요약 오류 :', error);
    }
  };

  useEffect(() => {
    if (typePensionID) {
      pensionsSummary();
    } else {
      placeSummary();
    }
  }, []);

  return (
    <div>
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
            {/* <IoIosStar /> */}
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
          <span className="ml-2 text-[#3288FF] ">{summary.reviewCount}명</span>
          <span className="text-[#8A8A8A]">이 리뷰를 남겨주셨습니다.</span>
        </div>
      </div>
    </div>
  );
};

export default AllReviewHeader;
