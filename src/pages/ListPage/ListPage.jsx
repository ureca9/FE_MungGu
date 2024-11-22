import React from "react";
import { useNavigate } from "react-router-dom";

const ListPage = ({ type }) => {
  const navigate = useNavigate();

  // 목록 더미 데이터
  const items = [
    {
      id: 1,
      name: "래빗 스테이",
      location: "전북 정읍시 첨단동",
      maxPeople: "최대 6명",
      maxPets: "3마리",
      rating: 4.8,
      reviews: 1254,
    },
    {
      id: 2,
      name: "래빗 스테이",
      location: "전북 정읍시 첨단동",
      maxPeople: "최대 6명",
      maxPets: "3마리",
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
        <h1 className="text-xl font-bold">{type === "facility" ? "시설 목록" : "펜션 목록"}</h1>
        <div className="w-6"></div> {/* Spacer for alignment */}
      </header>

      {/* Filter Section */}
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

      {/* List Items */}
      <div className="p-4 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-300"></div>

            {/* Info Section */}
            <div className="p-4">
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.location}</p>
              <p className="text-sm text-gray-500">
                {item.maxPeople} · {item.maxPets}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-yellow-500 font-semibold">
                  ⭐ {item.rating} ({item.reviews})
                </span>
                <button className="text-gray-500 hover:text-red-500">
                  ♥
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPage;