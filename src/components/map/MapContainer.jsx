import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const MapContainer = ({ onMapLoaded }) => {
  const mapContainer = useRef(null);

  const initMap = (latitude, longitude) => {
    const map = new window.kakao.maps.Map(mapContainer.current, {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3,
    });

    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(latitude, longitude),
    });
    marker.setMap(map);
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
