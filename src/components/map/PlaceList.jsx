import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useMapSearchStore from '../../stores/map/useMapSearchStore.js';
import PlaceCard from './PlaceCard';
import { addLikePlace, getLikeList } from '../../api/map/map.js';
import useCoordsStore from '../../stores/map/useCoordsStore.js';

const PlaceList = ({ selectedCategory }) => {
  const [likedPlaces, setLikedPlaces] = useState([]);
  const { searchResults } = useMapSearchStore();
  const { coords } = useCoordsStore();
  const { latitude, longitude } = coords;

  useEffect(() => {
    const fetchLikedPlaces = async () => {
      try {
        const response = await getLikeList('전체', latitude, longitude);
        setLikedPlaces(response || []);
      } catch (error) {
        console.error('Failed to fetch liked places:', error);
      }
    };

    fetchLikedPlaces();
  }, [latitude, longitude]);

  const likedPlacesMap = useMemo(
    () =>
      likedPlaces.reduce((acc, place) => {
        acc[place.placeId] = place.isLike;
        return acc;
      }, {}),
    [likedPlaces],
  );

  const handleLikeClick = async (placeId) => {
    const place = likedPlaces.find((place) => place.placeId === placeId);
    if (!place) return;

    const originalIsLike = place.isLike;
    const type = place.type;

    setLikedPlaces((prevPlaces) =>
      prevPlaces.map((place) =>
        place.placeId === placeId ? { ...place, isLike: !place.isLike } : place,
      ),
    );

    try {
      await addLikePlace(placeId, type);
    } catch (error) {
      console.error(error);

      setLikedPlaces((prevPlaces) =>
        prevPlaces.map((place) =>
          place.placeId === placeId
            ? { ...place, isLike: originalIsLike }
            : place,
        ),
      );
    }
  };

  const placesToShow = useMemo(() => {
    if (searchResults.length > 0) return searchResults;
    if (selectedCategory !== '전체') {
      return likedPlaces.filter((place) => place.category === selectedCategory);
    }
    return likedPlaces;
  }, [searchResults, selectedCategory, likedPlaces]);

  return (
    <div className="mt-4">
      {placesToShow.length > 0 ? (
        <ul className="space-y-6">
          {placesToShow.map((place, idx) => (
            <PlaceCard
              key={idx}
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
