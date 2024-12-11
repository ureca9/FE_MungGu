import { FaCamera } from 'react-icons/fa';
import { RxStarFilled } from 'react-icons/rx';
import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';

const MyReviewCard = ({ file, name, content, visitDate, score }) => {
  return (
    <div>
      <div className="flex">
        <div className=" flex  w-full h-32 rounded-2xl border border-[#8A8A8A] overflow-hidden">
          <div className="flex h-full min-w-32">
            {file ? (
              <image src={file} />
            ) : (
              <div className="flex text-3xl bg-[#D9D9D9] w-full text-[#8A8A8A] items-center justify-center">
                <FaCamera />
              </div>
            )}
          </div>
          <div className="flex flex-col w-full p-2">
            <div className="flex">
              <span className="text-[#FDBD00] text-xl">
                <RxStarFilled />
              </span>
              <span className="">{score}5</span>
            </div>
            <div>{name}장소</div>
            <div>{content}내용</div>
            <div className="flex justify-between w-full">
              <div>{visitDate}날짜</div>
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

export default MyReviewCard;
