import { useEffect, useRef, useState } from 'react';
import { FaDirections } from 'react-icons/fa';

const Map = () => {
  const mapContainer = useRef(null);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

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
    <div className="relative w-full h-[calc(100vh-8rem)]">
      <div className="absolute top-4 left-4 right-4 z-10 p-4 bg-transparent">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="지역명/장소으로 입력해주세요"
            className="w-full py-4 pl-2 border rounded-lg"
          />
          <button className="ml-4 px-4 py-1 bg-blue-500 text-white rounded-lg whitespace-nowrap flex flex-col items-center justify-center space-y-2">
            <FaDirections className="text-2xl" />
            <span>길찾기</span>
          </button>
        </div>
      </div>

      <div className="absolute inset-0">
        <div ref={mapContainer} id="map" className="w-full h-full"></div>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 z-20 bg-white rounded-t-lg shadow-lg transition-all duration-300 ${
          isPanelExpanded ? 'h-3/5' : 'h-20'
        }`}
      >
        <div
          className="flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setIsPanelExpanded(!isPanelExpanded)}
        >
          <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
        </div>

        {isPanelExpanded && (
          <div className="p-4 overflow-y-auto">
            <p>찜목록</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
