import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchModal from "../../components/MainPage/SearchModal/SearchModal.jsx";

const ListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { regions, activities } = location.state || {};

  // 검색창 상태
  const [showSearchModal, setShowSearchModal] = useState(false);

  // 필터링 상태
  const [selectedActivities, setSelectedActivities] = useState(activities || []);

  // 더미 데이터
  const items = [
    {
      id: 1,
      name: "래빗 스테이",
      location: "서울",
      maxPeople: "최대 6명",
      maxPets: "3마리",
      activity: "카페",
      rating: 4.8,
      reviews: 1254,
    },
    {
      id: 2,
      name: "푸른 언덕",
      location: "경기",
      maxPeople: "최대 8명",
      maxPets: "2마리",
      activity: "캠핑",
      rating: 4.5,
      reviews: 890,
    },
    {
      id: 3,
      name: "펜션 하우스",
      location: "인천",
      maxPeople: "최대 10명",
      maxPets: "4마리",
      activity: "식당",
      rating: 4.9,
      reviews: 1423,
    },
  ];

  // 필터링된 데이터
  const filteredItems = items.filter(
    (item) =>
      (!regions || regions.includes(item.location)) &&
      (!selectedActivities.length || selectedActivities.includes(item.activity))
  );

  // 필터 버튼 클릭 핸들러
  const toggleActivityFilter = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities((prev) => prev.filter((a) => a !== activity));
    } else {
      setSelectedActivities((prev) => [...prev, activity]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 검색 모달 */}
      {showSearchModal && (
        <SearchModal
          onClose={() => setShowSearchModal(false)}
          initialRegions={regions}
          initialActivities={selectedActivities}
        />
      )}

      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 text-lg"
        >{`<`}</button>
        <h1 className="text-xl font-bold">시설 목록</h1>
        <div className="w-6"></div>
      </header>

      {/* 검색창 */}
      <div className="p-4 bg-white shadow-sm">
        <div
          onClick={() => setShowSearchModal(true)}
          className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer"
        >
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="flex-grow text-gray-600"
            readOnly
          />
        </div>

        {/* 필터 버튼 */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto">
          {["카페", "식당", "캠핑", "놀이터", "쇼핑", "물놀이"].map((activity) => (
            <button
              key={activity}
              onClick={() => toggleActivityFilter(activity)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedActivities.includes(activity)
                    ? 'bg-blue-500 text-white'
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {activity}
            </button>
          ))}
        </div>
      </div>

      {/* 필터링된 리스트 */}
      <div className="p-4 space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="h-48 bg-gray-300"></div>
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
                  <button className="text-gray-500 hover:text-red-500">♥</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">조건에 맞는 시설이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ListPage;
