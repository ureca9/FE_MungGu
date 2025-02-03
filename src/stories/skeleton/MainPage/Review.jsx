import PropTypes from 'prop-types';

const Review = ({ count }) => {
  return (
    <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-thin sm:scrollbar-none">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="flex-none bg-white rounded-lg animate-pulse w-36 sm:w-60 snap-start"
          style={{ margin: 5 }}
        >
          <div className="w-full h-32 mb-2 bg-gray-300 rounded-lg"></div>
          <div className="h-5 mx-auto bg-gray-300 rounded w-28"></div>
          <div className="w-32 h-4 mx-auto mt-1 bg-gray-300 rounded"></div>
          <div className="w-40 h-10 mx-auto mt-2 bg-gray-300 rounded"></div>
          <div className="w-24 h-4 mx-auto mt-2 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

Review.propTypes = {
  count: PropTypes.number,
};

Review.defaultProps = {
  count: 3,
};

export default Review;
