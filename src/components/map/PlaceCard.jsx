import PropTypes from 'prop-types';
import { FaHeart, FaRegMap, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useCoordsStore from '../../stores/map/useCoordsStore.js';
import usePlaceStore from '../../stores/map/usePlaceStore.js';
import { SearchType } from '../../utils/SearchType.js';
import ROUTER_PATHS from '../../utils/RouterPath.js';

const PlaceCard = ({ place, likedPlaces, handleLikeClick }) => {
  const navigate = useNavigate();
  const { searchType } = usePlaceStore();
  const { setCoords } = useCoordsStore();

  const formatDistance = (distance) => {
    if (distance == null) return '';
    return distance >= 1000
      ? `${(distance / 1000).toFixed(1)}km`
      : `${distance}m`;
  };

  const { type, placeId, name, images, latitude, longitude } = place;

  const getBusinessStatus = (businessHour) => {
    if (!businessHour || businessHour.trim() === '정보없음') {
      return {
        status: '정보 없음',
        color: 'text-gray-400',
        message: '운영시간 정보가 없습니다.',
      };
    }

    const currentTime = new Date();
    const today = currentTime.getDay();
    const timeString = currentTime.toTimeString().split(' ')[0].slice(0, 5);

    const match = businessHour.match(/^(.*?)(\d{1,2}:\d{2}~\d{1,2}:\d{2})$/);
    if (match) {
      const [, days, hours] = match;
      const [openTime, closeTime] = hours.split('~').map((t) => t.trim());

      const daysMap = {
        일: 0,
        월: 1,
        화: 2,
        수: 3,
        목: 4,
        금: 5,
        토: 6,
      };
      const openDays = days.split('~').map((day) => daysMap[day.trim()]);

      if (openDays.length === 2) {
        const [startDay, endDay] = openDays;
        const isTodayOpen =
          (startDay <= today && today <= endDay) ||
          (startDay > endDay && (today >= startDay || today <= endDay));
        if (!isTodayOpen) {
          return {
            status: '영업 전',
            color: 'text-red-500',
            message: '오늘은 영업하지 않습니다.',
          };
        }
      }

      if (timeString < openTime) {
        return {
          status: '영업 전',
          color: 'text-red-500',
          message: `${openTime}에 영업 시작`,
        };
      } else if (timeString >= closeTime) {
        return {
          status: '영업 종료',
          color: 'text-gray-500',
          message: `${closeTime}에 영업 종료`,
        };
      } else {
        return {
          status: '영업 중',
          color: 'text-black',
          message: `${closeTime}에 영업 종료`,
        };
      }
    }

    return {
      status: '정보 없음',
      color: 'text-gray-400',
      message: '운영시간 정보가 없습니다.',
    };
  };

  const handleLinkClick = () => {
    if (type === 'PENSION') navigate(`/pension-detail/${placeId}`);
    else navigate(`/place/${placeId}`);
  };

  const handleMapClick = () => {
    setCoords(latitude, longitude);
    navigate(ROUTER_PATHS.MAP);
  };

  const { status, color, message } = getBusinessStatus(place.businessHour);

  return (
    <li className="bg-white p-4 rounded-lg shadow relative">
      <div className="absolute top-4 right-4">
        <button onClick={() => handleLikeClick(placeId)}>
          {searchType === SearchType.SEARCH ? (
            likedPlaces[placeId] ? (
              <FaHeart
                size={22}
                className="text-red-500 transition-colors duration-200"
              />
            ) : (
              <FaRegHeart
                size={22}
                className="text-black transition-colors duration-200"
              />
            )
          ) : (
            <FaRegMap size={22} onClick={handleMapClick} />
          )}
        </button>
      </div>
      <div className="flex-col">
        <div className="flex">
          <button
            onClick={handleLinkClick}
            aria-label={`${name} 상세정보 보기`}
            className="text-blue-600 text-xl font-semibold hover:underline"
          >
            {name}
          </button>
        </div>
        <div className="flex py-1">
          <p className={`font-bold ${color}`}>{status}</p>
          <p className="pl-3">{message}</p>
        </div>
        <div className="flex">
          <p className="font-bold">{formatDistance(place.distance)}</p>
          <p className="pl-3">{place.address}</p>
        </div>
      </div>
      <div className="mt-4">
        {images && images.length > 0 && (
          <div
            className={`
      grid 
      gap-4 
      ${images.length === 1 ? 'grid-cols-1' : ''}
      ${images.length === 2 ? 'grid-cols-2' : ''}
      ${images.length >= 3 ? 'grid-cols-3' : ''}
    `}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${name}-${index}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        )}
      </div>
    </li>
  );
};

PlaceCard.propTypes = {
  place: PropTypes.shape({
    placeId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    businessHour: PropTypes.string,
    distance: PropTypes.number,
    address: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  likedPlaces: PropTypes.object.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
};

export default PlaceCard;
