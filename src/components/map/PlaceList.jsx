import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useMapSearchStore from '../../stores/map/useMapSearchStore.js';
import PlaceCard from './PlaceCard';

const PlaceList = ({ selectedCategory }) => {
  const [placesToShow, setPlacesToShow] = useState([]);
  const { searchResults } = useMapSearchStore();

  const dummyPlaces = [
    {
      id: 1,
      name: '강아지와 함께하는 카페',
      category: '카페',
      address: '서울시 강남구 테헤란로 123',
      mainImages: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      distance: 500,
      isLiked: true,
    },
  ];

  const likedPlacesMap = useMemo(
    () =>
      placesToShow.reduce((acc, place) => {
        acc[place.placeId] = place.isLiked;
        return acc;
      }, {}),
    [placesToShow],
  );

  useEffect(() => {
    if (searchResults.length > 0) {
      setPlacesToShow(searchResults);
      console.log(searchResults);
    } else {
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
