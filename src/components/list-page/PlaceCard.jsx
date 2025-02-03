import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const PlaceCard = ({ place, onCardClick, onToggleLike }) => {
  const [liked, setLiked] = useState(place.likeStatus);

  const handleToggleLike = (e) => {
    
    e.stopPropagation(); // 부모 클릭 이벤트 차단
    setLiked(!liked);
    onToggleLike(place.placeId); // 좋아요 상태 토글
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
      onClick={() => onCardClick(place.placeId)}
    >
      <img
        src={place.images?.[0] || '/default-image.jpg'}
        alt={place.placeName || '이미지 없음'}
        className="w-full h-48 sm:h-80 object-cover"
      />

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gray-800 truncate">
            {place.placeName}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-medium">
              ⭐ {place.reviewAvg || '0'} ({place.reviewCount || '0'})
            </span>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full"
              onClick={handleToggleLike}
            >
              {liked ? (
                <FaHeart className="text-red-500" size={24} />
              ) : (
                <FaRegHeart className="text-gray-400" size={24} />
              )}
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-1">{place.address || '주소 정보 없음'}</p>
        <p className="text-sm text-gray-500">
          {place.businessHour ? `운영시간: ${place.businessHour}` : '운영시간 정보 없음'}
        </p>
      </div>
    </div>
  );
};

export default PlaceCard;
