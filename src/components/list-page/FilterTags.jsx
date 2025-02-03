const FilterTags = ({ tags, onToggleTag }) => {
  const allTags = [
    '전체',
    '주차 가능',
    '실내 공간',
    '실외 공간',
    '반려동물 전용',
    '수영장',
    '바비큐',
    '금연',
    '무게 제한 없음',
  ];

  const handleTagClick = (tag) => {
    if (tag === '전체') {
      onToggleTag(['전체']);
    } else {
      onToggleTag((prevTags) =>
        prevTags.includes(tag)
          ? prevTags.filter((t) => t !== tag)
          : [...prevTags.filter((t) => t !== '전체'), tag]
      );
    }
  };

  return (
    <div className="flex gap-2 p-4 overflow-x-auto bg-white shadow-sm scrollbar-hidden">
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`px-4 py-2 whitespace-nowrap border rounded-full ${
            tags.includes(tag)
              ? 'border-blue-500 text-blue-500 font-semibold'
              : 'border-gray-300 text-gray-600'
          } hover:bg-gray-100`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default FilterTags;
