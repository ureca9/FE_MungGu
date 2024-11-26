import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HotPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const navigate = useNavigate();

  const categories = ["전체", "카페", "펜션", "공원", "놀이터", "산"];

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch("/api/hot-places");
        if (!response.ok) {
          throw new Error("데이터를 가져오는데 실패했습니다.");
        }
        const data = await response.json();
        setPlaces(data.data); // 데이터 설정
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading) {
    return (
      <section className="p-4">
        <h2 className="text-lg font-bold mb-2">지금 핫한 장소 🔥</h2>
        <p>로딩 중...</p>
      </section>
    );
  }

  const filteredPlaces =
    selectedCategory === "전체"
      ? places
      : places.filter((place) => place.category === selectedCategory);

  const handleItemClick = (place) => {
    if (place.category === "펜션") {
      navigate(`/pension-detail/${place.id}`);
    } else {
      navigate(`/place/${place.id}`);
    }
  };

  return (
    <section className="p-4">
      <h2 className="text-lg font-bold mb-4">지금 핫한 장소 🔥</h2>

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