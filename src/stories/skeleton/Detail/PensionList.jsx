import PropTypes from 'prop-types';

const PensionList = ({ count }) => {
  return (
    <div className="px-6 py-4 space-y-4">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="overflow-hidden bg-white rounded-lg shadow-md animate-pulse"
        >
          <div className="w-full h-48 bg-gray-300 sm:h-80"></div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-40 h-5 bg-gray-300 rounded"></div>
              <div className="w-16 h-5 bg-gray-300 rounded"></div>
            </div>
            <div className="w-32 h-4 mb-1 bg-gray-300 rounded"></div>
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

PensionList.propTypes = {
  count: PropTypes.number,
};

PensionList.defaultProps = {
  count: 6,
};

export default PensionList;
