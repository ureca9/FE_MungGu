import { useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
  getCarDirection,
  getMarkers,
  getSpotInfo,
  searchSpot,
} from '../../api/map/map.js';
import heartMarker from '../../assets/common/heartMarker.png';
import useCoordsStore from '../../stores/map/useCoordsStore.js';
import usePlaceStore from '../../stores/map/usePlaceStore.js';
import { SearchType } from '../../utils/SearchType.js';

const MapContainer = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const currentLocationMarkerRef = useRef(null);
  const likedMarkersRef = useRef([]);
  const searchMarkersRef = useRef([]);
  const polylineRef = useRef(null);

  const { coords, setCoords } = useCoordsStore();
  const {
    searchResults,
    setSearchResults,
    setSelectedPlace,
    searchType,
    startLocation,
    endLocation,
    setStartLocation,
  } = usePlaceStore();

  const showError = (title, icon = 'error') => {
    Swal.fire({ title, icon });
  };

  const waitForKakaoMaps = (callback, retries = 10) => {
    if (window.kakao && window.kakao.maps) callback();
    else if (retries > 0)
      setTimeout(() => waitForKakaoMaps(callback, retries - 1), 100);
    else showError('Kakao Maps를 불러오지 못했습니다.');
  };

  const setCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords(latitude, longitude);

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(longitude, latitude, (result, status) => {
          const address =
            status === window.kakao.maps.services.Status.OK
              ? result[0]?.address?.address_name || '알 수 없는 위치'
              : '주소를 가져올 수 없습니다.';
          setStartLocation({
            name: `내 위치: ${address}`,
            latitude,
            longitude,
          });
        });

        initMap(latitude, longitude);
      },
      (error) => {
        console.error('현재 위치를 가져오지 못했습니다:', error);
        showError(
          '현재 위치를 가져오지 못했습니다. 위치 권한을 허용해주세요.',
          'question',
        );
      },
    );
  };

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
      likedMarkersRef.current = places.map((place) => {
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
        window.kakao.maps.event.addListener(marker, 'click', () => {
          handleMarkerClick(place);
        });
        return marker;
      });
    } catch (error) {
      console.error('찜한 장소를 불러오는 중 오류가 발생했습니다:', error);
      showError('찜한 장소를 불러오는데 실패했습니다.');
    }
  };

  const addSearchResultMarker = (map) => {
    searchMarkersRef.current = searchResults.map((place) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          Number(place.latitude),
          Number(place.longitude),
        ),
        map,
      });
      window.kakao.maps.event.addListener(marker, 'click', () => {
        handleMarkerClick(place);
      });
      return marker;
    });
  };

  const clearSearchMarkers = () => {
    searchMarkersRef.current.forEach((marker) => marker.setMap(null));
    searchMarkersRef.current = [];
  };

  const parsePlaceType = (type) => {
    const typeMapping = {
      PLACE: '시설',
      PENSION: '펜션',
    };
    return typeMapping[type] || type;
  };

  const handleMarkerClick = async (place) => {
    if (searchResults.length > 0) setSearchResults([]);
    const placeId = place.id || place.placeId;
    const placeType = parsePlaceType(place.type);
    const data = await getSpotInfo(
      placeId,
      placeType,
      place.latitude,
      place.longitude,
    );
    setSelectedPlace(data);
  };

  const drawRoute = async () => {
    if (!startLocation || !endLocation || !mapRef.current) return;

    try {
      const data = await getCarDirection(startLocation, endLocation);
      const linePath = data.routes[0].sections[0].roads.flatMap((road) => {
        return road.vertexes.reduce((path, vertex, index, array) => {
          if (index % 2 === 0) {
            path.push(new kakao.maps.LatLng(array[index + 1], vertex));
          }
          return path;
        }, []);
      });

      if (polylineRef.current) polylineRef.current.setMap(null);
      polylineRef.current = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: '#489AE7',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
      });
      polylineRef.current.setMap(mapRef.current);
    } catch (error) {
      console.error('경로 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    waitForKakaoMaps(setCurrentLocation);
  }, []);

  useEffect(() => {
    if (searchResults.length > 0 && mapRef.current) {
      const { latitude, longitude } =
        searchType === SearchType.SEARCH ? searchResults[0] : coords;
      mapRef.current.setCenter(
        new window.kakao.maps.LatLng(latitude, longitude),
      );
      clearSearchMarkers();
      addSearchResultMarker(mapRef.current);
    }
  }, [searchResults]);

  useEffect(() => {
    drawRoute();
  }, [startLocation, endLocation]);

  return <div ref={mapContainer} id="map" className="w-full h-full"></div>;
};

export default MapContainer;
