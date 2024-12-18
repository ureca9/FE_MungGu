import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import SearchHistory from '../../components/map/SearchHistory.jsx';
import useSearchHistoryStore from '../../stores/map/useSearchHistoryStore.js';
import usePlaceStore from '../../stores/map/usePlaceStore.js';
import useCoordsStore from '../../stores/map/useCoordsStore.js';
import { searchSpot } from '../../api/map/map.js';
import Swal from 'sweetalert2';
import ROUTER_PATHS from '../../utils/RouterPath.js';
import { SearchType } from '../../utils/SearchType.js';

const MapSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { searchHistory, setSearchHistory } = useSearchHistoryStore();
  const { searchType, setSearchResults, setSelectedPlace } = usePlaceStore();
  const { coords } = useCoordsStore();
  const { latitude, longitude } = coords;

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(storedHistory);
  }, []);

  const handleSaveSearchHistory = () => {
    if (searchTerm.trim() !== '') {
      let updatedHistory = [...searchHistory];
      if (!updatedHistory.includes(searchTerm))
        updatedHistory.unshift(searchTerm);

      if (searchHistory.length > 20) searchHistory.pop();
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      setSearchHistory(updatedHistory);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() !== '') {
      try {
        const response = await searchSpot(searchTerm, latitude, longitude);
        setSelectedPlace(null);
        if (response.content.length === 0)
          Swal.fire({
            title: '검색 결과가 없습니다.',
            text: `'${searchTerm}'에 대한 결과를 찾을 수 없습니다.`,
            icon: 'info',
          });
        else {
          handleSaveSearchHistory(searchTerm);
          setSearchResults(response.content);
          const routePath =
            searchType === SearchType.SEARCH
              ? ROUTER_PATHS.MAP
              : ROUTER_PATHS.MAP_SEARCH_RESULTS;
          navigate(routePath);
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: '오류 발생',
          text: '검색 중 문제가 발생했습니다. 다시 시도해주세요.',
          icon: 'error',
        });
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleHistoryClick = (historyTerm) => {
    setSearchTerm(historyTerm);
    if (historyTerm.trim()) handleSearch();
  };

  return (
    <div className="relative w-full h-[calc(100vh-8rem)] bg-white">
      <div className="absolute top-4 left-4 right-4 z-10 p-4 bg-transparent">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="지역명/장소를 입력해주세요"
            className="w-full py-4 pl-2 border rounded-lg"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleSearch}
          >
            <FaSearch className="text-2xl" />
          </button>
        </div>
      </div>
      <SearchHistory onHistoryClick={handleHistoryClick} />
    </div>
  );
};

export default MapSearch;
