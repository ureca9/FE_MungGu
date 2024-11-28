import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaDirections } from 'react-icons/fa';
import SearchHistory from '../../components/map/SearchHistory.jsx';

const Directions = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log('검색된 도착지:', endLocation);
  };

  return (
    <div className="relative w-full h-[calc(100vh-8rem)] flex flex-col">
      <div className="absolute top-4 left-4 right-4 z-10 p-4 bg-transparent">
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="출발지를 입력해주세요"
            className="flex-grow py-3 px-4 border border-gray-300 rounded-lg"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
          />
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => navigate('/map')}
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="도착지를 입력해주세요"
            className="flex-grow py-3 px-4 border border-gray-300 rounded-lg"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
          />
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handleSearch}
          >
            <FaDirections className="text-2xl" />
          </button>
        </div>
      </div>

      <div className="flex-grow pt-[4rem]">
        <SearchHistory />
      </div>
    </div>
  );
};

export default Directions;
