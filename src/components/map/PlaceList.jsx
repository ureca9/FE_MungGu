import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useMapSearchStore from '../../stores/map/useMapSearchStore.js';
import PlaceCard from './PlaceCard';
import { dummyPlaces } from '../../utils/DummyPlaces.js';

const PlaceList = ({ selectedCategory }) => {
  const [placesToShow, setPlacesToShow] = useState([]);
  const { searchResults } = useMapSearchStore();

  useEffect(() => {
    if (searchResults.length > 0) setPlacesToShow(searchResults);
    else {
      const likedPlaces = dummyPlaces.filter((place) => place.isLiked);
      if (selectedCategory === '전체') setPlacesToShow(likedPlaces);
      else
        setPlacesToShow(
          likedPlaces.filter((place) => place.category === selectedCategory),
        );
    }
  }, [selectedCategory, searchResults]);

  const handleLikeClick = (placeId) => {
    setPlacesToShow((prevPlaces) => {
      return prevPlaces.map((place) =>
        place.placeId === placeId
          ? { ...place, isLiked: !place.isLiked }
          : place,
      );
    });
  };

  return (
    <div className="mt-4">
      {placesToShow.length > 0 ? (
        <ul className="space-y-6">
          {placesToShow.map((place) => (
            <PlaceCard
              key={place.placeId}
              place={place}
              likedPlaces={placesToShow.reduce((acc, place) => {
                acc[place.placeId] = place.isLiked;
                return acc;
              }, {})}
              handleLikeClick={handleLikeClick}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">저장된 장소가 없습니다.</p>
      )}
    </div>
  );
};

PlaceList.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};

export default PlaceList;
