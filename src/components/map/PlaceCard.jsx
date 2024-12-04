import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const PlaceCard = ({ place, likedPlaces, handleLikeClick }) => {
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

    if (currentTime < openDateTime) {
      return {
        status: '영업 전',
        color: 'text-red-500',
        message: `${openTime}에 영업 시작`,
      };
    } else {
      return {
        status: '영업 중',
        color: 'text-black',
        message: `${closeTime}에 영업 종료`,
      };
    }
  };

  const { status, color, message } = getBusinessStatus(
    place.openTime,
    place.closeTime,
  );

  return (
    <li className="bg-white p-4 rounded-lg shadow relative">
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
            href={`/place/${place.placeId}`}
            aria-label={`${place.placeName} 상세정보 보기`}
            className="text-blue-600 text-xl font-semibold hover:underline"
          >
            {place.placeName}
          </a>
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
};

PlaceCard.propTypes = {
  place: PropTypes.shape({
    placeId: PropTypes.string.isRequired,
    placeName: PropTypes.string.isRequired,
    openTime: PropTypes.string.isRequired,
    closeTime: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  likedPlaces: PropTypes.object.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
};

export default PlaceCard;
