import { IoIosStar } from 'react-icons/io';
import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';
import { RxStarFilled } from 'react-icons/rx';
import { FaPenAlt } from 'react-icons/fa';
import ROUTER_PATHS from '../../utils/RouterPath';
import { useNavigate } from 'react-router-dom';

const AllReviewHeader = () => {
  const navigate = useNavigate();

  
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="flex text-xl font-semibold">장소명입니다{}</h1>
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
          <span className="text-4xl font-bold">{}5.0</span>
          <span className="flex items-end text-xl h-full text-[#8A8A8A]">
            /5
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-[#8A8A8A]">
            <FaPenAlt />
          </span>
          <span className="ml-2 text-[#3288FF] ">{}123명</span>
          <span className="text-[#8A8A8A]">이 리뷰를 남겨주셨습니다.</span>
        </div>
      </div>
    </div>
  );
};

export default AllReviewHeader;
