import { useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getMarkers, searchSpot } from '../../api/map/map.js';
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
  const { coords, setCoords } = useCoordsStore();
  const {
    searchResults,
    setSelectedPlace,
    searchType,
    startLocation,
    endLocation,
  } = usePlaceStore();

  const waitForKakaoMaps = (retries = 10) => {
    if (window.kakao && window.kakao.maps) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords(latitude, longitude);
          initMap(latitude, longitude);
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
      searchMarkersRef.current.push(marker);
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

  useEffect(() => {
    waitForKakaoMaps();
  }, []);

  useEffect(() => {
    if (searchResults.length > 0) {
      const { latitude, longitude } =
        searchType === SearchType.SEARCH ? searchResults[0] : coords;
      // setCoords(latitude, longitude);

      if (mapRef.current) {
        mapRef.current.setCenter(
          new window.kakao.maps.LatLng(latitude, longitude),
        );
        console.log(latitude, longitude);
        clearSearchMarkers();
        addSearchResultMarker(mapRef.current);
      }
    }
  }, [searchResults]);

  useEffect(() => {
    if (startLocation && endLocation && mapRef.current) {
      console.log('hi');
      const startCoord = new window.kakao.maps.LatLng(
        startLocation.latitude,
        startLocation.longitude,
      );
      const endCoord = new window.kakao.maps.LatLng(
        endLocation.latitude,
        endLocation.longitude,
      );

      mapRef.current.setCenter(startCoord);

      new window.kakao.maps.Marker({
        position: startCoord,
        map: mapRef.current,
      });
      new window.kakao.maps.Marker({
        position: endCoord,
        map: mapRef.current,
      });

      const directionsService =
        new window.kakao.maps.services.DirectionsService();
      directionsService.route(
        {
          start: startCoord,
          end: endCoord,
          waypoints: [],
          car: true,
        },
        (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const path = result.routes[0].path;
            const polyline = new window.kakao.maps.Polyline({
              path,
              strokeWeight: 5,
              strokeColor: '#FF0000',
              strokeOpacity: 1,
              strokeStyle: 'solid',
            });
            polyline.setMap(mapRef.current);
          } else {
            console.error('길찾기 경로를 찾을 수 없습니다.');
          }
        },
      );
    }
  }, [startLocation, endLocation]);

  return <div ref={mapContainer} id="map" className="w-full h-full"></div>;
};

export default MapContainer;
