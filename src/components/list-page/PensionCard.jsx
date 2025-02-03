import React from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const PensionCard = ({ pension, onPensionClick, onToggleLike }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
      onClick={() => onPensionClick(pension.pensionId)}
    >
      <img
        src={pension.images?.[0] || '/placeholder-image.jpg'}
        alt={pension.pensionName || '이미지 없음'}
        className="w-full h-48 sm:h-[250px] object-cover"
      />
      <div className="p-4 flex justify-between items-start">
        <div className="flex flex-col space-y-1">
          <h2 className="text-[14px] sm:text-xl font-bold mb-2 truncate">
            {pension.pensionName || '이름 없음'}
          </h2>
          <p className="text-[10px] sm:text-sm text-gray-500 truncate">
            {pension.address || '주소 정보 없음'}
          </p>

          <p className="text-sm text-gray-500 flex sm:hidden flex-col">
            <span>입실 {pension.startTime || '정보 없음'}</span>
            <span>퇴실 {pension.endTime || '정보 없음'}</span>
          </p>
        </div>

        <div className="flex flex-col items-end space-y-1 -mt-1">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-yellow-500 font-semibold">
              ⭐ {pension.reviewAvg || '0'}{' '}
              <span className="text-gray-500 text-sm">
                ({pension.reviewCount || '0'})
              </span>
            </span>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike(pension.pensionId);
              }}
            >
              {pension.likeStatus ? (
                <FaHeart className="text-red-500" size={20} />
              ) : (
                <FaRegHeart className="text-gray-400" size={20} />
              )}
            </button>
          </div>
          <div className="flex items-baseline space-x-1 flex-nowrap">
            <span className="text-blue-500 font-bold text-lg sm:text-2xl">
              {pension.lowestPrice
                ? `${pension.lowestPrice.toLocaleString()}원`
                : '가격 미정'}
            </span>
            <span className="text-gray-500 text-xs sm:text-sm">
              / 1박
            </span>
          </div>

          <p className="hidden sm:flex text-sm text-gray-500 space-x-1">
            <span>입실 {pension.startTime || '정보 없음'}</span>
            <span>~</span>
            <span>퇴실 {pension.endTime || '정보 없음'}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PensionCard;
