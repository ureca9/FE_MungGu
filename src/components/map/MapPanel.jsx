import PropTypes from 'prop-types';
import LikeListCategory from './LikeListCategory';
import LikeList from './LikeList';
import { useState } from 'react';

const MapPanel = ({ panelState, setPanelState }) => {
  const panelHeightClass = {
    collapsed: 'h-32',
    expanded: 'h-2/5',
    maximized: 'h-[calc(100vh-15rem)]',
  };

  const [selectedCategory, setSelectedCategory] = useState('전체');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPanelState('maximized');
  };

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 z-20 bg-white rounded-t-lg shadow-lg transition-all duration-300 ${panelHeightClass[panelState]} overflow-y-auto`}
    >
      <div
        className="flex items-center justify-center p-4 cursor-pointer"
        onClick={() => {
          if (panelState === 'collapsed') setPanelState('expanded');
          else if (panelState === 'expanded') setPanelState('maximized');
          else setPanelState('collapsed');
        }}
      >
        <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
      </div>

      <div
        className="h-full p-4 overflow-y-auto"
        role="region"
        aria-label="카테고리 및 장소 목록"
      >
        <LikeListCategory onCategorySelect={handleCategorySelect} />
        <LikeList selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

MapPanel.propTypes = {
  panelState: PropTypes.oneOf(['collapsed', 'expanded', 'maximized'])
    .isRequired,
  setPanelState: PropTypes.func.isRequired,
};

export default MapPanel;
