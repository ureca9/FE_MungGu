import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const MapSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(storedHistory);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      let updatedHistory = [...searchHistory];
      if (!updatedHistory.includes(searchTerm))
        updatedHistory.unshift(searchTerm);

      if (searchHistory.length > 20) searchHistory.pop();
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      setSearchHistory(updatedHistory);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleDelete = (item) => {
    const updatedHistory = searchHistory.filter(
      (historyItem) => historyItem !== item,
    );
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className="relative w-full h-screen bg-white">
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

      <div className="pt-[7rem] p-4 flex-grow">
        <ul>
          {searchHistory.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between px-10 py-5 border-b border-gray-300"
            >
              <span className="text-xl">{item}</span>
              <button
                className="ml-2 text-gray-300"
                onClick={() => handleDelete(item)}
              >
                <FaTimes />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapSearch;
