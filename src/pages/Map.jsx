import { useEffect, useRef } from 'react';

const Map = () => {
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
        },
        (error) => {
          console.error('현재 위치를 가져오지 못했습니다:', error);
          alert('현재 위치를 가져오지 못했습니다. 위치 권한을 허용해주세요.');
        },
      );
    } else if (retries > 0)
      setTimeout(() => waitForKakaoMaps(retries - 1), 100);
    else alert('Kakao Maps를 불러오지 못했습니다.');
  };

  useEffect(() => {
    waitForKakaoMaps();
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-screen p-4 bg-gray-50">
      <div
        ref={mapContainer}
        className="w-full max-w-4xl h-[500px] border border-gray-300 shadow-lg rounded-lg"
      ></div>
    </div>
  );
};

export default Map;
