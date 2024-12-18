import { FaDirections } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ROUTER_PATHS from '../../utils/RouterPath.js';
import usePlaceStore from '../../stores/map/usePlaceStore.js';
import { SearchType } from '../../utils/SearchType.js';

const MapSearch = () => {
  const navigate = useNavigate();
  const { setSearchType } = usePlaceStore();

  const handleDirectionsClick = () => navigate(ROUTER_PATHS.DIRECTIONS);
  return (
    <div className="absolute top-4 left-4 right-4 z-10 p-4 bg-transparent">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="지역명/장소으로 입력해주세요"
          className="w-full py-4 pl-2 border rounded-lg"
          onFocus={() => {
            setSearchType(SearchType.SEARCH);
            navigate(ROUTER_PATHS.MAP_SEARCH);
          }}
        />
        <button
          className="ml-4 px-4 py-1 bg-blue-500 text-white rounded-lg whitespace-nowrap flex flex-col items-center justify-center space-y-2"
          onClick={handleDirectionsClick}
        >
          <FaDirections className="text-2xl" />
          <span>길찾기</span>
        </button>
      </div>
    </div>
  );
};

export default MapSearch;
