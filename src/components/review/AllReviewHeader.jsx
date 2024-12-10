import { RxStarFilled } from 'react-icons/rx';
import { FaPenAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';
import ROUTER_PATHS from '../../utils/RouterPath';
import { GetPensionsSummary } from '../../api/review';

const AllReviewHeader = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({});

  const pensionsSummary = async () => {
    try {
      const response = await GetPensionsSummary();
      console.log('편션 요약 응답 :', response);
      setSummary(response.data);
    } catch (error) {
      console.error('펜션 요약 오류 :', error);
    }
  };

  useEffect(() => {
    pensionsSummary();
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
            // onClick={onDelete}
            onClick={(e) => {
              e.preventDefault();
              navigate(ROUTER_PATHS.REVIEW_ADD);
            }}
            // style={{ display: deleteButton ? 'block' : 'none' }}
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
