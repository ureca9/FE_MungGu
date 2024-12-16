import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { getMarkers, searchSpot } from '../../api/map/map.js';
import heartMarker from '../../assets/common/heartMarker.png';
import useCoordsStore from '../../stores/map/useCoordsStore.js';
import usePlaceStore from '../../stores/map/usePlaceStore.js';

const MapContainer = ({ onMapLoaded }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const currentLocationMarkerRef = useRef(null);
  const likedMarkersRef = useRef([]);
  const searchMarkersRef = useRef([]);
  const { coords, setCoords } = useCoordsStore();
  const { searchResults, setSelectedPlace } = usePlaceStore();

  const initMap = async (latitude, longitude) => {
    const map = new window.kakao.maps.Map(mapContainer.current, {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3,
    });
    mapRef.current = map;

    addCurrentMarker(map, latitude, longitude);
    await addLikedMarker(map);
  };

  const addCurrentMarker = (map, latitude, longitude) => {
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(latitude, longitude),
      map,
    });
    currentLocationMarkerRef.current = marker;
  };

  const addLikedMarker = async (map) => {
    try {
      const places = await getMarkers();
      places.forEach((place) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            Number(place.latitude),
            Number(place.longitude),
          ),
          map,
          image: new window.kakao.maps.MarkerImage(
            heartMarker,
            new window.kakao.maps.Size(26, 34),
            { offset: new window.kakao.maps.Point(16, 34) },
          ),
        });
        likedMarkersRef.current.push(marker);
        window.kakao.maps.event.addListener(marker, 'click', () => {
          handleMarkerClick(place);
        });
      });
    } catch (error) {
      console.error('찜한 장소를 불러오는 중 오류가 발생했습니다:', error);
      Swal.fire({
        title: '찜한 장소를 불러오는데 실패했습니다.',
        icon: 'error',
      });
    }
  };

  const addSearchResultMarker = (map) => {
    searchResults.forEach((place) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          Number(place.latitude),
          Number(place.longitude),
        ),
        map,
      });
      searchResults.push(marker);
      window.kakao.maps.event.addListener(marker, 'click', () => {
        handleMarkerClick(place);
      });
    });
  };

  const clearSearchMarkers = () => {
    searchMarkersRef.current.forEach((marker) => marker.setMap(null));
    searchMarkersRef.current = [];
  };

  const handleMarkerClick = async (place) => {
    const data = await searchSpot(place.name, place.latitude, place.longitude);
    setSelectedPlace(data.content);
  };

  const waitForKakaoMaps = (retries = 10) => {
    if (window.kakao && window.kakao.maps) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords(latitude, longitude);
          initMap(latitude, longitude);
          if (onMapLoaded) onMapLoaded();
        },
        (error) => {
          console.error('현재 위치를 가져오지 못했습니다:', error);
          Swal.fire({
            title: '현재 위치를 가져오지 못했습니다. 위치 권한을 허용해주세요.',
            icon: 'question',
          });
        },
      );
    } else if (retries > 0)
      setTimeout(() => waitForKakaoMaps(retries - 1), 100);
    else
      Swal.fire({
        title: 'Kakao Maps를 불러오지 못했습니다.',
        icon: 'error',
      });
  };

  useEffect(() => {
    waitForKakaoMaps();
  }, []);

  useEffect(() => {
    if (searchResults.length > 0) {
      const { latitude, longitude } = searchResults[0];
      setCoords(latitude, longitude);

      if (mapRef.current) {
        mapRef.current.setCenter(
          new window.kakao.maps.LatLng(latitude, longitude),
        );
        console.log(latitude, longitude);
        clearSearchMarkers();
        addSearchResultMarker(mapRef.current);
      }
    }
  }, [searchResults, setCoords]);
  return <div ref={mapContainer} id="map" className="w-full h-full"></div>;
};

MapContainer.propTypes = {
  onMapLoaded: PropTypes.func,
};

export default MapContainer;
