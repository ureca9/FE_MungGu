import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import usePlaceStore from '../../stores/map/usePlaceStore.js';
import PlaceCard from './PlaceCard';
import { addLikePlace, getLikeList } from '../../api/map/map.js';
import useCoordsStore from '../../stores/map/useCoordsStore.js';
import useLoadingStore from '../../stores/common/useLoadingStore.js';

const PlaceList = ({ selectedCategory }) => {
  const { searchResults, likedPlaces, selectedPlace, setLikedPlaces } =
    usePlaceStore();
  const { coords } = useCoordsStore();
  const { latitude, longitude } = coords;
  const { isMapLoading } = useLoadingStore();

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

  const likedPlacesMap = useMemo(() => {
    const combinedPlaces = [...likedPlaces, ...searchResults];
    return combinedPlaces.reduce((acc, place) => {
      acc[place.placeId] = place.isLike;
      return acc;
    }, {});
  }, [likedPlaces, searchResults]);

  const handleLikeClick = async (placeId) => {
    const place =
      searchResults.find((place) => place.placeId === placeId) ||
      likedPlaces.find((place) => place.placeId === placeId);

    if (!place) return;

    const originalIsLike = place.isLike || false;
    const type = place.type;

    usePlaceStore.setState((state) => ({
      searchResults: state.searchResults.map((p) =>
        p.placeId === placeId ? { ...p, isLike: !p.isLike } : p,
      ),
      likedPlaces: state.likedPlaces.map((p) =>
        p.placeId === placeId ? { ...p, isLike: !p.isLike } : p,
      ),
    }));

    try {
      await addLikePlace(placeId, type);
    } catch (error) {
      console.error('Failed to like place:', error);

      usePlaceStore.setState((state) => ({
        searchResults: state.searchResults.map((p) =>
          p.placeId === placeId ? { ...p, isLike: originalIsLike } : p,
        ),
        likedPlaces: state.likedPlaces.map((p) =>
          p.placeId === placeId ? { ...p, isLike: originalIsLike } : p,
        ),
      }));
    }
  };

  const placesToShow = useMemo(() => {
    if (selectedPlace) return [selectedPlace];
    if (searchResults.length > 0) return searchResults;
    if (selectedCategory !== '전체') {
      return likedPlaces.filter(
        (place) => place.categoryName === selectedCategory,
      );
    }
    return likedPlaces;
  }, [searchResults, selectedCategory, likedPlaces, selectedPlace]);

  return (
    <div className="mt-4">
      {!isMapLoading && placesToShow.length > 0 ? (
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
      ) : null}
    </div>
  );
};

PlaceList.propTypes = {
  selectedCategory: PropTypes.string,
};

export default PlaceList;
