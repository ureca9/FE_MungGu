import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTER_PATHS from '../../utils/RouterPath';

const ViewHistoryMiniCard = () => {
  const [recentPlaces, setRecentPlaces] = useState([]);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null); // ref 추가
  useEffect(() => {
    const storedPlaces = localStorage.getItem('watched');
    if (storedPlaces) {
      setRecentPlaces(JSON.parse(storedPlaces));
    }
  }, []);
  const handleCardClick = () => {
    if (!recentPlaces[0].placeid && !recentPlaces[0].pensionId) {
      console.error(
        '유효하지 않은 항목입니다: placeid 또는 pensionId가 필요합니다',
      );
      return;
    }

    navigate(ROUTER_PATHS.VIEW_HISTORY);
  };
  return (
    <>
      {recentPlaces.length > 0 && (
        <div
          className="relative w-auto max-w-28"
          ref={cardRef}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {isExpanded ? (
            <ul className="overflow-hidden bg-white rounded-lg border border-[#D9D9D9]">
              <h1 className="flex justify-center bg-white">최근 본 장소</h1>
              {recentPlaces.slice(0, 2).map((place, index) => (
                <li
                  key={index}
                  className="flex border border-[#D9D9D9] h-24"
                  onClick={handleCardClick}
                >
                  <img
                    src={place.image}
                    className="object-cover p-1.5 rounded-lg"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div
              className="w-16 h-16 overflow-hidden border border-gray-900 rounded-full "
              onClick={() => setIsExpanded(true)}
            >
              <img src={recentPlaces[0].image} className="w-full h-full" />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewHistoryMiniCard;
