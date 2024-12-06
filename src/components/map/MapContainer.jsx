import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { getMarkers } from '../../api/map/map.js';
import heartMarker from '../../assets/common/heartMarker.png';

const MapContainer = ({ onMapLoaded }) => {
  const mapContainer = useRef(null);

  const initMap = async (latitude, longitude) => {
    const map = new window.kakao.maps.Map(mapContainer.current, {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 10,
    });

    addCurrentMarker(map, latitude, longitude);
    await addLikedMarker(map);
  };

  const addCurrentMarker = (map, latitude, longitude) => {
    new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(latitude, longitude),
      map,
    });
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

        const infoWindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">${place.name}</div>`,
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(map, marker);
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

  const waitForKakaoMaps = (retries = 10) => {
    if (window.kakao && window.kakao.maps) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
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

  return <div ref={mapContainer} id="map" className="w-full h-full"></div>;
};

MapContainer.propTypes = {
  onMapLoaded: PropTypes.func,
};

export default MapContainer;
