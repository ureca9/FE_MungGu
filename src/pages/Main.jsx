import React, { useEffect, useRef, useState } from 'react';
import HotPlaces from '../components/main-page/HotPlaces';
import RecommendedPensions from '../components/main-page/RecommendedPensions';
import LiveReviews from '../components/main-page/LiveReviews';
import SearchModal from '../components/main-page/search-modal/SearchModal.jsx';
import AdImage2 from '../stories/assets/광고2.svg';
import AdImage3 from '../stories/assets/광고3.svg';
import FooterImage from '../stories/assets/Footer.svg';
import ViewHistoryMiniCard from '../components/review/ViewHistoryMiniCard.jsx';

const Main = () => {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const targetRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(entry.isIntersecting);
      },
      { threshold: 1 }, // 타겟 요소가 완전히 화면에 들어왔을 때를 기준으로 함
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white ">
      <div className="mx-6 md:mx-12">
        <div className="py-4 bg-white">
          <p className="mb-2 text-sm font-semibold text-center sm:text-lg">
            <span className="font-bold text-blue-500">
              1,200여개의 반려견 동반 가능 장소!
            </span>{' '}
            지금 검색해보세요
          </p>

          <div className="flex justify-center">
            <button
              className="flex items-center justify-between w-full p-3 text-left text-gray-600 bg-white border-2 border-blue-500 rounded-xl "
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

        <div className="py-8">
          <HotPlaces />
        </div>

        <div className="py-8">
          <RecommendedPensions />
        </div>

        <div className="flex justify-center">
          <img
            src={AdImage3}
            alt="광고 이미지"
            className="w-full max-w-screen-md md:hidden"
          />
          <img
            src={AdImage2}
            alt="광고 이미지"
            className="hidden w-full max-w-screen-md md:block"
          />
        </div>

        <div className="mt-6">
          <LiveReviews />
        </div>
      </div>
      <span
        className={`fixed z-50 bottom-[70px] md:bottom-1/2 right-[2%] md:right-1/2 md:translate-x-[500px] ${isSticky ? 'fixed' : ''}`}
      >
        <ViewHistoryMiniCard />
      </span>
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
