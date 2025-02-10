import PropTypes from 'prop-types';

const Default = ({ count }) => {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className="p-4 bg-gray-200 border rounded-lg cursor-pointer animate-pulse"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-20 h-5 bg-gray-300 rounded"></div>
            <div className="w-12 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="w-full h-40 bg-gray-300 rounded"></div>
        </li>
      ))}
    </ul>
  );
};

Default.propTypes = {
  count: PropTypes.number,
};

Default.defaultProps = {
  count: 6,
};

export default Default;
