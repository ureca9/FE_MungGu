import PropTypes from 'prop-types';
import LikeListCategory from './LikeListCategory';

const MapPanel = ({ panelState, setPanelState }) => {
  const panelHeightClass = {
    collapsed: 'h-32',
    expanded: 'h-2/5',
    maximized: 'h-[calc(100vh-15rem)]',
  };

  const handleCategorySelect = () => setPanelState('maximized');

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 z-20 bg-white rounded-t-lg shadow-lg transition-all duration-300 ${panelHeightClass[panelState]}`}
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

      <div className="p-4 overflow-y-auto">
        <LikeListCategory onCategorySelect={handleCategorySelect} />
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
