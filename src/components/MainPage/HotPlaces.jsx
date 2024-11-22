import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HotPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const navigate = useNavigate(); // useNavigate 사용

  // 더미 데이터
  const categories = ["전체", "카페", "펜션", "공원", "놀이터", "산"];
  const dummyData = [
    { id: "1", name: "장소 1", address: "경기 부천시", category: "카페", img: "", reviewAvg: "4.3", reviewCount: "15" },
    { id: "2", name: "장소 2", address: "서울 강남구", category: "펜션", img: "", reviewAvg: "4.7", reviewCount: "12" },
    { id: "3", name: "장소 3", address: "경기 용인시", category: "카페", img: "", reviewAvg: "4.8", reviewCount: "20" },
    { id: "4", name: "장소 4", address: "인천 송도", category: "공원", img: "", reviewAvg: "4.5", reviewCount: "10" },
    { id: "5", name: "장소 5", address: "제주 서귀포시", category: "펜션", img: "", reviewAvg: "4.9", reviewCount: "25" },
    { id: "6", name: "장소 6", address: "강원 평창군", category: "산", img: "", reviewAvg: "4.6", reviewCount: "18" },
    { id: "7", name: "장소 7", address: "경기 고양시", category: "카페", img: "", reviewAvg: "4.4", reviewCount: "11" },
    { id: "8", name: "장소 8", address: "서울 종로구", category: "펜션", img: "", reviewAvg: "4.8", reviewCount: "19" },
    { id: "9", name: "장소 9", address: "부산 해운대", category: "공원", img: "", reviewAvg: "4.7", reviewCount: "14" },
    { id: "10", name: "장소 10", address: "인천 연수구", category: "놀이터", img: "", reviewAvg: "4.2", reviewCount: "8" },
    { id: "11", name: "장소 11", address: "강원 속초시", category: "산", img: "", reviewAvg: "4.9", reviewCount: "22" },
    { id: "12", name: "장소 12", address: "서울 송파구", category: "카페", img: "", reviewAvg: "4.3", reviewCount: "16" },
  ];

  useEffect(() => {
    // 로딩 후 데이터 설정
    setLoading(true);
    setTimeout(() => {
      setPlaces(dummyData);
      setLoading(false);
    }, 1000); // 1초 딜레이 시뮬레이션
  }, []);

  if (loading) {
    return (
      <section className="p-4">
        <h2 className="text-lg font-bold mb-2">지금 핫한 장소 🔥</h2>
        <p>로딩 중...</p>
      </section>
    );
  }

  // 카테고리별 필터링된 데이터
  const filteredPlaces =
    selectedCategory === "전체"
      ? places // 전체 표시
      : places.filter((place) => place.category === selectedCategory);

  // 항목 클릭 시 상세보기 페이지로 이동
  const handleItemClick = (place) => {
    if (place.category === "펜션") {
      navigate(`/pension-detail/${place.id}`); // 펜션 상세보기로 이동
    } else {
      navigate(`/place/${place.id}`); // 시설 상세보기로 이동
    }
  };

  return (
    <section className="p-4">
      <h2 className="text-lg font-bold mb-4">지금 핫한 장소 🔥</h2>

      {/* Category Filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Horizontal Scrollable List */}
      <div className="flex gap-4 overflow-x-auto">
        {filteredPlaces.map((place) => (
          <div
            key={place.id}
            className="w-40 flex-shrink-0 p-4 bg-white shadow-md rounded-lg text-center cursor-pointer"
            onClick={() => handleItemClick(place)}
          >
            <div className="bg-gray-300 w-full h-20 rounded-lg mb-2">이미지</div>
            <h3 className="text-sm font-bold">{place.name}</h3>
            <p className="text-xs text-gray-500">{place.address}</p>
            <p className="text-sm text-yellow-500 mt-1">
              ⭐ {place.reviewAvg} ({place.reviewCount} 리뷰)
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotPlaces;