import React from 'react';

const SearchBar = ({ onOpenModal }) => (
  <div className="p-4 bg-white mt-2">
    <div
      className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer flex-grow"
      onClick={onOpenModal}
    >
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="flex-grow text-gray-600 bg-transparent focus:outline-none"
        readOnly
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-5 h-5 text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M16.5 9.75a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0z"
        />
      </svg>
    </div>
  </div>
);

export default SearchBar;