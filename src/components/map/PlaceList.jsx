import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useMapSearchStore from '../../stores/map/useMapSearchStore.js';
import PlaceCard from './PlaceCard';
import { getLikeList } from '../../api/map/map.js';
import useCoordsStore from '../../stores/map/useCoordsStore.js';

const PlaceList = ({ selectedCategory }) => {
  const [placesToShow, setPlacesToShow] = useState([]);
  const { searchResults } = useMapSearchStore();
  const { coords } = useCoordsStore();
  const { latitude, longitude } = coords;

  const likedPlacesMap = useMemo(
    () =>
      placesToShow.reduce((acc, place) => {
        acc[place.placeId] = place.isLiked;
        return acc;
      }, {}),
    [placesToShow],
  );

  useEffect(() => {
    const fetchLikedPlaces = async () => {
      try {
        const response = await getLikeList('전체', latitude, longitude);
        setPlacesToShow(response || []);
      } catch (error) {
        console.error('Failed to fetch liked places:', error);
      }
    };

    fetchLikedPlaces();
  }, [latitude, longitude]);

  useEffect(() => {
    if (searchResults.length > 0) setPlacesToShow(searchResults);
    else if (selectedCategory !== '전체') {
      setPlacesToShow((prevPlaces) =>
        prevPlaces.filter((place) => place.category === selectedCategory),
      );
    }
  }, [selectedCategory, searchResults]);

  const handleLikeClick = (placeId) => {
    setPlacesToShow((prevPlaces) =>
      prevPlaces.map((place) =>
        place.placeId === placeId
          ? { ...place, isLiked: !place.isLiked }
          : place,
      ),
    );
  };

  return (
    <div className="mt-4">
      {placesToShow.length > 0 ? (
        <ul className="space-y-6">
          {placesToShow.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              likedPlaces={likedPlacesMap}
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
