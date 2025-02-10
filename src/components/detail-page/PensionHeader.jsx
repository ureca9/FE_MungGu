import { FaHeart, FaRegHeart } from 'react-icons/fa';

const PensionHeader = ({ pensionName, address, likeStatus, onToggleLike, tags = [], reviewAvg, reviewCount }) => {
  return (
    <section className="p-4 mt-4 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{pensionName}</h2>
        <button
          onClick={onToggleLike}
          className="flex items-center justify-center w-10 h-10 rounded-full"
        >
          {likeStatus ? (
            <FaHeart className="text-red-500" size={24} />
          ) : (
            <FaRegHeart className="text-gray-400" size={24} />
          )}
        </button>
      </div>

      <p className="text-sm text-gray-500">{address}</p>

      <div className="flex items-center mt-2">
        <span className="mr-2 text-yellow-500">
          ⭐ {reviewAvg ? reviewAvg.toFixed(1) : '0.0'}
        </span>
        <span className="text-sm text-gray-500">
          ({reviewCount || 0} 리뷰)
        </span>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-gray-200 rounded-full text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};

export default PensionHeader;