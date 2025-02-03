import PropTypes from 'prop-types';

const Recommend = ({ count }) => {
  return (
    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin sm:scrollbar-none pb-1 mb-[-1px]">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="flex-none bg-white rounded-lg animate-pulse sm:text-center w-36 sm:w-60 snap-start"
        >
          <div className="w-full h-32 mb-2 bg-gray-300 rounded-lg"></div>
          <div className="h-5 mx-auto bg-gray-300 rounded w-28"></div>
          <div className="w-32 h-4 mx-auto mt-1 bg-gray-300 rounded"></div>
          <div className="w-24 h-4 mx-auto mt-1 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

Recommend.propTypes = {
  count: PropTypes.number,
};

Recommend.defaultProps = {
  count: 3,
};

export default Recommend;
