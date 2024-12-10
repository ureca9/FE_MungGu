import { FaTimes } from 'react-icons/fa';
import useSearchHistoryStore from '../../stores/map/useSearchHistoryStore.js';
import PropTypes from 'prop-types';

const SearchHistory = ({ onHistoryClick }) => {
  const { searchHistory, setSearchHistory } = useSearchHistoryStore();

  const handleDelete = (item) => {
    const updatedHistory = searchHistory.filter(
      (historyItem) => historyItem !== item,
    );
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className="pt-[7rem] p-4 flex-grow">
      <ul>
        {searchHistory.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between px-10 py-5 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
            onClick={() => onHistoryClick(item)}
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
  );
};

SearchHistory.propTypes = {
  onHistoryClick: PropTypes.func.isRequired,
};

export default SearchHistory;
