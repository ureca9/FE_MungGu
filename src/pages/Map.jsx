import { useEffect, useRef } from 'react';

const Map = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const waitForKakaoMaps = () => {
      if (window.kakao && window.kakao.maps) {
        const map = new window.kakao.maps.Map(mapContainer.current, {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        });

        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(37.5665, 126.978),
        });

        marker.setMap(map);
        window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
          const latLng = mouseEvent.latLng;
          alert(`클릭한 위치의 좌표는: ${latLng.getLat()}, ${latLng.getLng()}`);
        });
      } else {
        setTimeout(waitForKakaoMaps, 100);
      }
    };

    waitForKakaoMaps();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl mb-4">카카오 지도 페이지</h1>
      <div
        ref={mapContainer}
        style={{
          width: '100%',
          height: '500px',
          border: '1px solid black',
        }}
      ></div>
    </div>
  );
};

export default Map;
