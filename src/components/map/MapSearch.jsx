import { FaDirections, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ROUTER_PATHS from '../../utils/RouterPath.js';
import usePlaceStore from '../../stores/map/usePlaceStore.js';
import { SearchType } from '../../utils/SearchType.js';
import usePolylineStore from '../../stores/map/usePolylineStore.js';

const MapSearch = () => {
  const navigate = useNavigate();
  const {
    searchType,
    startLocation,
    endLocation,
    setSearchType,
    setSearchResults,
    setSelectedPlace,
    setEndLocation,
  } = usePlaceStore();
  const { polyline, clearPolyline } = usePolylineStore();

  const handleDirectionsClick = () => navigate(ROUTER_PATHS.DIRECTIONS);
  const resetSearch = () => {
    setSearchType(SearchType.SEARCH);
    setSelectedPlace(null);
    setEndLocation(null);
    setSearchResults([]);
    if (polyline) polyline.setMap(null);
    clearPolyline();
  };
  return (
    <div className="absolute top-4 left-4 right-4 z-10 p-4 bg-transparent">
      {searchType === SearchType.SEARCH ? (
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
      ) : (
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="출발지를 입력해주세요"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg"
              value={startLocation?.name}
              onClick={() => {
                setSearchType(SearchType.START);
                navigate(ROUTER_PATHS.MAP_SEARCH);
              }}
              readOnly={true}
            />
            <button
              className="text-gray-500 hover:text-red-500"
              onClick={() => resetSearch()}
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="도착지를 입력해주세요"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg mr-8"
              value={endLocation?.name}
              onClick={() => {
                setSearchType(SearchType.END);
                navigate(ROUTER_PATHS.MAP_SEARCH);
              }}
              readOnly={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MapSearch;
