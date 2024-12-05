import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { useState } from 'react';

const ReviewDetailModal = ({ isOpen, onClose }) => {
  // const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-1/2 p-4 max-w-[500px] min-w-80 bg-white rounded-md h-2/3">
          <DialogTitle className="text-lg font-bold">리뷰 상세</DialogTitle>
          <Description as="div" className="mt-2">
            {/* 모달 내용 */}
            리뷰 상세 내용이 여기에 들어갑니다.
          </Description>

          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 mt-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={onClose}
          >
            닫기
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ReviewDetailModal;
