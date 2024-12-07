import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { useState } from 'react';
import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';
import useAllReviewsStore from '../../stores/review/useAllReviewsStore';
import { RxStarFilled } from 'react-icons/rx';
import usericon from '../../assets/MypageImg/user.svg';

const ReviewDetailModal = ({ isOpen, onClose, reviewData = {} }) => {
  // const [isOpen, setIsOpen] = useState(true);
  const { pensionsReviewData } = useAllReviewsStore();
  const {
    reviewId,
    content,
    nickname,
    score,
    visitDate,
    file,
    profileImageUrl,
  } = reviewData;
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="flex bg-white rounded-md h-4/5 min-w-[375px] lg:max-w-6xl lg:h-2/4 ">
          <Description as="div" className="flex flex-col md:flex-row">
            <div className="flex w-1/2 md:w-full">
              {file.length > 0 ? ( // 이미지가 있는 경우
                <>
                  {file.map((file, index) => (
                    <img
                      key={index}
                      className="w-full h-full  bg-[#D9D9D9] rounded-lg items-center justify-center"
                      src={file.fileUrl || usericon}
                    />
                  ))}
                </>
              ) : (
                // 이미지가 없는 경우
                <div className="flex w-full h-full  bg-[#D9D9D9] rounded-lg items-center justify-center text-[#8A8A8A]">
                  이미지 없음
                </div>
              )}
            </div>
            <div className="flex flex-col w-1/2 p-5">
              <div className="flex flex-row justify-between">
                <div className="flex items-center">
                  <img
                    className="bg-[#F5F5F5] border border-[#8A8A8A] rounded-full size-12"
                    src={profileImageUrl || usericon}
                  />
                  <span className="ml-2 text-[#8A8A8A]">{nickname} 님</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-[#FDBD00] text-2xl">
                    {/* <IoIosStar /> */}
                    <RxStarFilled />
                  </span>
                  <span className="ml-1 font-semibold">{score}.0</span>
                  <span className="font-extralight text-[#8A8A8A] text-sm ml-3">
                    {visitDate}
                  </span>
                </div>
              </div>
              <div className="flex mt-5">{content}</div>

              <div className="bottom-0 flex">
                {file.map((file, index) => (
                  <img
                    key={index}
                    className="w-32 h-32  bg-[#D9D9D9] rounded-lg items-center justify-center"
                    src={file.fileUrl || usericon}
                  />
                ))}
              </div>
            </div>
          </Description>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ReviewDetailModal;
