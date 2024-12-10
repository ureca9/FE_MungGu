import { FaCamera } from 'react-icons/fa';
import { RxStarFilled } from 'react-icons/rx';
import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';
import { div } from 'framer-motion/client';

const MyReview = () => {
  return (
    <div className="flex flex-col gap-3 p-7">
      <div className="flex justify-between ">
        <input
          type="search"
          placeholder="내용을 작성해 주세요."
          className="bg-[#F5F5F5] w-1/3 h-10 rounded-lg border bords"
        />
        <span>
          <CRUDBtn styleType="black" size="xs" label="최신순" />
          <CRUDBtn styleType="black" size="xs" label="오래된순" />
        </span>
      </div>
      <div className="flex">
        <div className=" flex  w-full h-32 rounded-2xl border border-[#8A8A8A]">
          <div className="flex w-28">
            {/* {file ? (
            <image src={file} />
          ) : ( */}
            <div className="flex text-3xl bg-[#D9D9D9] w-full text-[#8A8A8A] items-center justify-center">
              <FaCamera />
            </div>
            {/* )} */}
          </div>
          <div className="flex flex-col p-2">
            <div className="flex">
              <span className="text-[#FDBD00] text-xl">
                <RxStarFilled />
              </span>
              <span className="">5</span>
            </div>
            <div>name</div>
            <div>content</div>
            <div className="flex justify-between">
              <div>visitDate</div>
              <div className="flex">
                <span>
                  <CRUDBtn styleType="reverseBlue" size="xs" label="수정" />
                </span>
                <span>
                  <CRUDBtn styleType="reverseBlue" size="xs" label="삭제" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReview;
