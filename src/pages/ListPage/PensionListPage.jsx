import React from "react";
import { useNavigate } from "react-router-dom";

const PensionListPage = () => {
  const navigate = useNavigate();

  // 더미 데이터
  const pensions = [
    {
      id: 1,
      name: "래빗 스테이",
      location: "전북 정읍시 첨단동",
      maxPeople: "최대 6명",
      maxPets: "3마리",
      price: "220,000원",
      checkIn: "입실 12:00",
      checkOut: "퇴실 11:00",
      rating: 4.8,
      reviews: 1254,
    },
    {
      id: 2,
      name: "래빗 스테이",
      location: "전북 정읍시 첨단동",
      maxPeople: "최대 6명",
      maxPets: "3마리",
      price: "220,000원",
      checkIn: "입실 12:00",
      checkOut: "퇴실 11:00",
      rating: 4.8,
      reviews: 1254,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 text-lg"
        >{`<`}</button>
        <h1 className="text-xl font-bold">지역명</h1>
        <div className="w-6"></div> {/* Spacer for alignment */}
      </header>

      {/* Search and Filters */}
      <div className="p-4 bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="검색"
            className="flex-grow p-3 border border-gray-300 rounded-lg"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            검색
          </button>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {["무게 제한 없음", "실내 가능", "배변패드", "주차 가능", "울타리 있음"].map(
            (filter) => (
              <button
                key={filter}
                className="px-4 py-2 bg-gray-200 rounded-full text-sm hover:bg-gray-300"
              >
                {filter}
              </button>
            )
          )}
        </div>
      </div>

      {/* Pension List */}
      <div className="p-4 space-y-4">
        {pensions.map((pension) => (
          <div
            key={pension.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-300"></div>

            {/* Info Section */}
            <div className="p-4">
              <h2 className="text-lg font-bold">{pension.name}</h2>
              <p className="text-sm text-gray-500">{pension.location}</p>
              <p className="text-sm text-gray-500">
                {pension.maxPeople} · {pension.maxPets}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-yellow-500 font-semibold">
                  ⭐ {pension.rating} ({pension.reviews})
                </span>
                <span className="text-blue-500 font-semibold">
                  {pension.price} / 1박
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {pension.checkIn} ~ {pension.checkOut}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-14 bg-white border-t">
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

export default PensionListPage;