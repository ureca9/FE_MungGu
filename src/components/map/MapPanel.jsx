import LikeListCategory from './LikeListCategory';
import PlaceList from './PlaceList.jsx';
import { useState } from 'react';
import usePlaceStore from '../../stores/map/usePlaceStore.js';
import usePanelStateStore from '../../stores/map/usePanelStateStore.js';
import { FaTimes } from 'react-icons/fa';
import heartBtn from '../../assets/common/heartBtn.png';

const MapPanel = () => {
  const panelHeightClass = {
    collapsed: 'h-32',
    expanded: 'h-2/5',
    maximized: 'h-[calc(100vh-15rem)]',
  };

  const [selectedCategory, setSelectedCategory] = useState('전체');
  const { searchResults } = usePlaceStore();
  const { panelState, setPanelState } = usePanelStateStore();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPanelState('maximized');
  };

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 z-20 bg-white rounded-t-lg shadow-lg transition-all duration-300 ${panelHeightClass[panelState]} overflow-y-auto scrollbar-none`}
      aria-expanded={panelState !== 'collapsed'}
      aria-label={`장소 정보 패널 - ${panelState === 'collapsed' ? '접힘' : '펼쳐짐'}`}
    >
      <div
        className="flex items-center justify-center p-4 cursor-pointer sticky top-0 z-10"
        onClick={(e) => {
          e.stopPropagation();
          if (panelState === 'collapsed') setPanelState('expanded');
          else if (panelState === 'expanded') setPanelState('maximized');
          else setPanelState('expanded');
        }}
      >
        <div className="flex-grow flex justify-center">
          <div className="w-12 h-1 bg-gray-400 rounded-full hover:bg-blue-500"></div>
        </div>
        <FaTimes
          className="text-2xl text-gray-500 hover:text-red-500"
          onClick={(e) => {
            e.stopPropagation();
            setPanelState('collapsed');
          }}
        />
      </div>
      {searchResults.length === 0 && (
        <div className="flex justify-center items-center py-1">
          <img src={heartBtn} />
          <span className="text-2xl text-center">저장</span>
        </div>
      )}

      <div
        className="h-full p-4"
        role="region"
        aria-label="카테고리 및 장소 목록"
      >
        {searchResults.length === 0 && (
          <LikeListCategory onCategorySelect={handleCategorySelect} />
        )}
        <PlaceList selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default MapPanel;
