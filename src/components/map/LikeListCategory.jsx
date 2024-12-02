import { useState } from 'react';
import PropTypes from 'prop-types';

const LikeListCategory = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = [
    '전체',
    '카페',
    '펜션',
    '마당',
    '공원',
    '놀이터',
    '섬',
    '해수욕장',
  ];

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    if (onCategorySelect) onCategorySelect(categoryName);
  };

  return (
    <div className="p-4 rounded-lg">
      <div className="flex gap-3">
        {categories.map((category) => (
          <button
            key={category}
            className={`flex justify-around items-center w-full py-2 border-2 rounded-lg transition ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700'
            } hover:bg-gray-100`}
            onClick={() => handleCategoryClick(category)}
          >
            <span>{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

LikeListCategory.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
};

export default LikeListCategory;
