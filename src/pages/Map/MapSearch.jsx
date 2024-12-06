import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import SearchHistory from '../../components/map/SearchHistory.jsx';
import useSearchHistoryStore from '../../stores/map/useSearchHistoryStore.js';
import { dummyPlaces } from '../../utils/DummyPlaces.js';
import useMapSearchStore from '../../stores/map/useMapSearchStore.js';

const MapSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { searchHistory, setSearchHistory } = useSearchHistoryStore();
  const { setSearchResults, searchResults } = useMapSearchStore();

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

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      handleSaveSearchHistory(searchTerm);
      const filteredResults = dummyPlaces.filter((place) =>
        place.placeName.includes(searchTerm),
      );
      setSearchResults(filteredResults);
      console.log(filteredResults, searchResults);
      navigate('/map');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="relative w-full h-[calc(100vh-8rem)] bg-white">
      <div className="absolute top-4 left-4 right-4 z-10 p-4 bg-transparent">
        <div className="flex items-center">
          <button
            className="mr-4 p-2 bg-gray-100 rounded-full"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="text-lg" />
          </button>
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
      <SearchHistory />
    </div>
  );
};

export default MapSearch;
