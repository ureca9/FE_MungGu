import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { useState } from 'react';
import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';

const ReviewDetailModal = ({ isOpen, onClose }) => {
  // const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full p-4 bg-white rounded-md h-2/4 sm:w-3/4 md:w-2/3 lg:max-w-screen-xl h-1/3 ">
          <DialogTitle className="text-lg font-bold">리뷰 상세</DialogTitle>
          <Description as="div" className="mt-2">
            {/* 모달 내용 */}
            리뷰 상세 내용이 여기에 들어갑니다.
          </Description>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ReviewDetailModal;
