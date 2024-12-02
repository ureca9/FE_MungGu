import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const LikeList = ({ selectedCategory }) => {
  const [places, setPlaces] = useState([]);
  const [likedPlaces, setLikedPlaces] = useState({});

  const hardcodedPlaces = [
    {
      placeId: 1,
      placeName: '강아지와 함께하는 카페',
      category: '카페',
      address: '서울시 강남구 테헤란로 123',
      images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      openTime: '09:00',
      closeTime: '21:00',
      distance: 500,
    },
    {
      placeId: 2,
      placeName: '펜션에서의 휴식',
      category: '펜션',
      address: '경기도 가평군 청평로 456',
      images: ['https://via.placeholder.com/150'],
      openTime: '22:00',
      closeTime: '10:00',
      distance: 1200,
    },
    {
      placeId: 3,
      placeName: '강아지를 위한 놀이터',
      category: '놀이터',
      address: '부산시 해운대구 마린시티 789',
      images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      openTime: '08:00',
      closeTime: '20:00',
      distance: 300,
    },
    {
      placeId: 4,
      placeName: '바닷가에서 산책',
      category: '해수욕장',
      address: '제주도 서귀포시 중문관광로 101',
      images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      openTime: '10:00',
      closeTime: '22:00',
      distance: 100,
    },
  ];
  const formatDistance = (distance) => {
    return distance >= 1000
      ? `${(distance / 1000).toFixed(1)}km`
      : `${distance}m`;
  };

  const getBusinessStatus = (openTime, closeTime) => {
    const currentTime = new Date();
    const [openHour, openMinute] = openTime.split(':').map(Number);

    const openDateTime = new Date();
    openDateTime.setHours(openHour, openMinute, 0);

    if (currentTime < openDateTime)
      return {
        status: '영업 전',
        color: 'text-red-500',
        message: `${openTime}에 영업 시작`,
      };
    else
      return {
        status: '영업 중',
        color: 'text-black-500',
        message: `${closeTime}에 영업 종료`,
      };
  };

  useEffect(() => {
    if (selectedCategory === '전체') setPlaces(hardcodedPlaces);
    else
      setPlaces(
        hardcodedPlaces.filter((place) => place.category === selectedCategory),
      );
  }, [selectedCategory]);

  const handleLikeClick = (placeId) => {
    setLikedPlaces((prevLikedPlaces) => ({
      ...prevLikedPlaces,
      [placeId]: !prevLikedPlaces[placeId],
    }));
  };

  return (
    <div className="mt-4">
      {places.length > 0 ? (
        <ul className="space-y-6">
          {places.map((place) => {
            const { status, color, message } = getBusinessStatus(
              place.openTime,
              place.closeTime,
            );
            return (
              <li
                key={place.placeId}
                className="bg-white p-4 rounded-lg shadow relative"
              >
                <div className="absolute top-4 right-4">
                  <button onClick={() => handleLikeClick(place.placeId)}>
                    {likedPlaces[place.placeId] ? (
                      <FaHeart
                        size={22}
                        className="text-red-500 transition-colors duration-200"
                      />
                    ) : (
                      <FaRegHeart
                        size={22}
                        className="text-black transition-colors duration-200"
                      />
                    )}
                  </button>
                </div>
                <div className="flex-col">
                  <div className="flex">
                    <a
                      href={`#`}
                      className="text-blue-600 text-xl font-semibold hover:underline"
                    >
                      {place.placeName}
                    </a>
                    <p className="text-sm text-gray-500 mt-1 pl-3">
                      {place.category}
                    </p>
                  </div>
                  <div className="flex py-1">
                    <p className={`font-bold ${color}`}>{status}</p>
                    <p className="pl-3">{message}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold">
                      {formatDistance(place.distance)}
                    </p>
                    <p className="pl-3">{place.address}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div
                    className={`
      grid 
      gap-4 
      ${place.images.length === 1 ? 'grid-cols-1' : ''}
      ${place.images.length === 2 ? 'grid-cols-2' : ''}
      ${place.images.length >= 3 ? 'grid-cols-3' : ''}
    `}
                  >
                    {place.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${place.placeName}-${index}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-600">
          선택한 카테고리에 저장된 장소가 없습니다.
        </p>
      )}
    </div>
  );
};

LikeList.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};

export default LikeList;
