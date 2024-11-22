import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlaceDetailPage = () => {
  const navigate = useNavigate();
  const [showFullIntro, setShowFullIntro] = useState(false);

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const toggleIntro = () => {
    setShowFullIntro(!showFullIntro);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center">
        <button onClick={handleBack} className="mr-4 text-gray-600 text-lg">
          {'<'}
        </button>
        <h1 className="text-xl font-bold">장소명</h1>
      </header>

      {/* Image Section */}
      <div className="bg-gray-300 h-48 w-full flex items-center justify-center">
        {/* Replace with actual image */}
        <img
          src="https://via.placeholder.com/800x300" // 예시 이미지
          alt="Place"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Place Info */}
      <section className="bg-white p-4">
        <h2 className="text-lg font-bold mb-2">장소명입니다.</h2>
        <p className="text-gray-600 text-sm mb-2">서울 강남구 강남대로</p>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-yellow-500 text-sm">⭐ 4.5 (200)</span>
          <button className="text-gray-600 text-sm border px-2 py-1 rounded-lg">
            즐겨찾기
          </button>
          <button className="text-gray-600 text-sm border px-2 py-1 rounded-lg">
            공유하기
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {['주차 가능', '반려견 출입 가능', '쇼핑', '물놀이 가능'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-200 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white mt-4 p-4">
        <h3 className="text-lg font-bold mb-2">소개글</h3>
        <p className="text-gray-600 text-sm mb-2">
          {showFullIntro
            ? `이곳은 정말 아름답습니다. 주변 산책로와 놀이터가 잘 구비되어 있어
            반려견과 함께하기 좋습니다. 이곳에서 즐거운 시간을 보내세요.`
            : `이곳은 정말 아름답습니다. 주변 산책로와 놀이터가 잘 구비되어 있어
            반려견과 함께하기 좋습니다.`}
        </p>
        <button onClick={toggleIntro} className="text-blue-500 text-sm">
          {showFullIntro ? '접기' : '더보기'}
        </button>
      </section>

      {/* Reviews */}
      <section className="bg-white mt-4 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">리얼 리뷰</h3>
          <button className="text-blue-500 text-sm">전체 보기 ></button>
        </div>
        <div className="flex gap-4 overflow-x-scroll">
          {[1, 2, 3, 4, 5].map((_, idx) => (
            <div
              key={idx}
              className="w-24 h-24 bg-gray-300 rounded-lg flex-shrink-0"
            >
              {/* Replace with review images */}
            </div>
          ))}
        </div>
      </section>

      {/* Basic Info */}
      <section className="bg-white mt-4 p-4">
        <h3 className="text-lg font-bold mb-2">기본 정보</h3>
        <ul className="text-gray-600 text-sm list-disc pl-5">
          <li>반려견 동반 입장 가능.</li>
          <li>야외 좌석 제공.</li>
          <li>주차 가능.</li>
        </ul>
      </section>

      {/* Usage Info */}
      <section className="bg-white mt-4 p-4">
        <h3 className="text-lg font-bold mb-2">이용 정보</h3>
        <p className="text-gray-600 text-sm mb-2">
          방문 시 반려동물 목줄을 착용해 주세요. 기본적으로 예약이 필요하지 않으나,
          주말과 공휴일에는 붐빌 수 있습니다.
        </p>
      </section>

      {/* Warnings */}
      <section className="bg-white mt-4 p-4">
        <h3 className="text-lg font-bold mb-2">주의 사항</h3>
        <p className="text-gray-600 text-sm">
          - 시설을 사용한 후 쓰레기를 치워주세요. <br />
          - 반려견이 다른 방문객에게 피해를 주지 않도록 관리해 주세요.
        </p>
      </section>

      {/* Bottom Navigation */}
      <footer className="bg-white fixed bottom-0 left-0 right-0 flex justify-around items-center h-14 border-t">
        <button className="text-center text-sm">
          <div className="text-lg">🏠</div>
          홈
        </button>
        <button className="text-center text-sm">
          <div className="text-lg">📍</div>
          지도
        </button>
        <button className="text-center text-sm">
          <div className="text-lg">🐾</div>
          즐겨찾기
        </button>
        <button className="text-center text-sm">
          <div className="text-lg">⚙️</div>
          설정
        </button>
      </footer>
    </div>
  );
};

export default PlaceDetailPage;