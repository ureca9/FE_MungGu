import React, { useState } from 'react';
import HotPlaces from '../components/MainPage/HotPlaces';
import RecommendedPensions from '../components/MainPage/RecommendedPensions';
import LiveReviews from '../components/MainPage/LiveReviews';
import SearchModal from '../components/MainPage/SearchModal/SearchModal.jsx';
import AdImage2 from '../stories/assets/광고2.svg';
import AdImage3 from '../stories/assets/광고3.svg';
import FooterImage from '../stories/assets/Footer.svg';

const Main = () => {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">

      <div className="p-4 bg-white">
        <p className="text-sm font-semibold text-center mb-2 sm:text-lg">
          <span className="text-blue-500 font-bold">
            1,200여개의 반려견 동반 가능 장소!
          </span>{' '}
          지금 검색해보세요
        </p>

        <div className="flex justify-center">
          <button
            className="w-[80%] p-3 bg-white border-2 border-blue-500 rounded-xl text-gray-600 text-left flex items-center justify-between sm:w-[89%]"
            onClick={() => setSearchModalOpen(true)}
          >
            무엇을 찾고 싶나요?
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
          </button>
        </div>
      </div>

      <div className="px-8">
        <HotPlaces />
      </div>

      <div className="px-8 mt-6">
        <RecommendedPensions />
      </div>

      <div className="pl-2 flex justify-center mt-6">
        <img
          src={AdImage3}
          alt="광고 이미지"
          className="w-[80%] max-w-screen-md sm:hidden"
        />
        <img
          src={AdImage2}
          alt="광고 이미지"
          className="hidden sm:block w-[88%] max-w-screen-md"
        />
      </div>

      <div className="px-8 mt-6">
        <LiveReviews />
      </div>

      <div className="flex justify-center mt-10">
        <img
          src={FooterImage}
          alt="푸터 이미지"
          className="w-full max-w-screen-lg"
        />
      </div>

      {isSearchModalOpen && (
        <SearchModal onClose={() => setSearchModalOpen(false)} />
      )}
    </div>
  );
};

export default Main;
