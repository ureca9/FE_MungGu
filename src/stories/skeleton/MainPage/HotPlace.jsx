import PropTypes from 'prop-types';

const HotPlace = ({ count }) => {
  return (
    <div className="flex gap-x-[5px] overflow-x-auto snap-x snap-mandatory sm:scrollbar-none">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-y-4 w-[270px] sm:w-[340px] scroll-snap-align-start"
          style={{ flex: '0 0 auto' }}
        >
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="flex items-center py-2 bg-white rounded-lg animate-pulse"
              style={{ width: '100%' }}
            >
              <div className="flex-shrink-0 w-20 h-20 bg-gray-300 rounded-lg"></div>

              <div className="flex-1 ml-2">
                <div className="w-24 h-4 mb-1 bg-gray-300 rounded"></div>
                <div className="w-32 h-5 mb-2 bg-gray-400 rounded"></div>
                <div className="w-20 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

HotPlace.propTypes = {
  count: PropTypes.number,
};

HotPlace.defaultProps = {
  count: 3,
};

export default HotPlace;
