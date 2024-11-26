import PropTypes from 'prop-types';

const MapPanel = ({ isPanelExpanded, setIsPanelExpanded }) => {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 z-20 bg-white rounded-t-lg shadow-lg transition-all duration-300 ${
        isPanelExpanded ? 'h-3/5' : 'h-20'
      }`}
    >
      <div
        className="flex items-center justify-center p-4 cursor-pointer"
        onClick={() => setIsPanelExpanded(!isPanelExpanded)}
      >
        <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
      </div>

      {isPanelExpanded && (
        <div className="p-4 overflow-y-auto">
          <p>찜목록</p>
        </div>
      )}
    </div>
  );
};

MapPanel.propTypes = {
  isPanelExpanded: PropTypes.bool.isRequired,
  setIsPanelExpanded: PropTypes.func.isRequired,
};

export default MapPanel;
