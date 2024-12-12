import React, { useState } from 'react';
import HotPlaces from '../components/MainPage/HotPlaces';
import RecommendedPensions from '../components/MainPage/RecommendedPensions';
import LiveReviews from '../components/MainPage/LiveReviews';
import SearchModal from "../components/MainPage/SearchModal/SearchModal.jsx";

const Main = () => {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}

      {/* Search */}
      <div className="p-4 bg-white">
        <button
          className="w-full p-3 bg-gray-100 rounded-lg text-gray-600 text-left"
          onClick={() => setSearchModalOpen(true)}
        >
          무엇을 찾고 싶나요?
        </button>
      </div>

      {/* Sections */}
      <HotPlaces />
      <RecommendedPensions />
      <LiveReviews />

      {/* Search Modal */}
      {isSearchModalOpen && <SearchModal onClose={() => setSearchModalOpen(false)} />}
    </div>
  );
};

export default Main;