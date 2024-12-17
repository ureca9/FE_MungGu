import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import fireIcon from '../../stories/assets/fire.svg';

const HotPlaces = ({ accessToken, refreshAccessToken }) => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(7); // 기본값을 7(펜션)으로 설정
  const scrollRef = useRef(null);
  const categoryRef = useRef(null);
  const navigate = useNavigate();

  const categories = [
    { id: 7, name: "펜션", apiPath: "/api/v1/pensions/top" }, // 펜션을 첫 번째로
    { id: 6, name: "마당", apiPath: "/api/v1/places/6/top" }, // 마당을 두 번째로
    { id: 1, name: "공원", apiPath: "/api/v1/places/1/top" },
    { id: 2, name: "관광지", apiPath: "/api/v1/places/2/top" },
    { id: 3, name: "놀이터", apiPath: "/api/v1/places/3/top" },
    { id: 4, name: "카페", apiPath: "/api/v1/places/4/top" },
    { id: 5, name: "해수욕장", apiPath: "/api/v1/places/5/top" },
  ];

  const fetchPlaces = async () => {
    try {
      let token = accessToken || localStorage.getItem("ACCESS_TOKEN");

      if (!token) {
        setError("로그인이 필요합니다.");
        return;
      }

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const selectedApiPath = categories.find(
        (category) => category.id === selectedCategory
      )?.apiPath;

      if (!selectedApiPath) throw new Error("유효하지 않은 카테고리입니다.");

      const response = await axios.get(`https://meong9.store${selectedApiPath}`, { headers });
      if (response.data && response.data.data) {
        setPlaces(response.data.data);
      } else {
        setPlaces([]);
      }
    } catch (error) {
      setError("데이터를 가져오는데 실패했습니다.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, [selectedCategory]);

  const handleItemClick = (place) => {
    const routePath =
      selectedCategory === 7
        ? `/pension-detail/${place.pensionId}`
        : `/place/${place.placeId || place.pensionId}`;
    navigate(routePath);
  };

  // 드래그 스크롤 기능
  const addDragScroll = (ref) => {
    let isDragging = false;
    let startX, scrollLeft;

    const mouseDownHandler = (e) => {
      isDragging = true;
      startX = e.pageX - ref.current.offsetLeft;
      scrollLeft = ref.current.scrollLeft;
    };

    const mouseMoveHandler = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - ref.current.offsetLeft;
      const walk = (x - startX) * 2; // 스크롤 속도
      ref.current.scrollLeft = scrollLeft - walk;
    };

    const mouseUpHandler = () => {
      isDragging = false;
    };

    ref.current.addEventListener("mousedown", mouseDownHandler);
    ref.current.addEventListener("mousemove", mouseMoveHandler);
    ref.current.addEventListener("mouseup", mouseUpHandler);
    ref.current.addEventListener("mouseleave", mouseUpHandler);
  };

  useEffect(() => {
    if (scrollRef.current) addDragScroll(scrollRef);
    if (categoryRef.current) addDragScroll(categoryRef);
  }, []);

  return (
    <section className="p-4">
      <LoadingSpinner />
      <h2 className="text-lg font-bold mb-4">
  지금 핫한 장소 
  <img 
    src={fireIcon} 
    alt="불 아이콘" 
    className="inline-block w-6 h-6 relative" 
    style={{ top: '-5px' , left : '10px'}}
  />
</h2>

      {/* 카테고리 버튼 */}
      <div
        ref={categoryRef}
        className="flex gap-2 mb-4 overflow-x-auto cursor-grab"
        style={{ scrollbarWidth: "none" }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 min-w-[100px] border rounded-lg ${
              selectedCategory === category.id
                ? "border-[#3288ff] text-blue-500 font-semibold"
                : "border-gray-300 text-gray-600"
            } hover:bg-gray-100 text-center`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* 스크롤 가능한 그리드 */}
      <div
  ref={scrollRef}
  className="
    flex gap-x-[5px] overflow-x-auto snap-x snap-mandatory 
    scrollbar-thin scrollbar-thumb-[#3288ff] scrollbar-track-gray-200
    sm:scrollbar-none"
  style={{ scrollSnapType: "x mandatory" }}
>
  {places.length > 0 &&
    [...Array(Math.ceil(places.length / 3))].map((_, index) => {
      const startIndex = index * 3;
      const listItems = places.slice(startIndex, startIndex + 3);

      return (
        <div
          key={index}
          className="flex flex-col gap-y-4 w-[340px] scroll-snap-align-start"
          style={{ flex: "0 0 auto" }}
        >
          {listItems.map((place, idx) => (
            <div
              key={`place-${place.placeId || place.pensionId}-${idx}`}
              className="flex items-center bg-white p-2 rounded-lg cursor-pointer"
              style={{ width: "100%" }}
              onClick={() => handleItemClick(place)}
            >
              {/* 이미지 영역 */}
              <div
                className="w-20 h-20 bg-gray-300 rounded-lg flex-shrink-0"
                style={{
                  backgroundImage: `url(${place.placeImageUrl || place.pensionImageUrl || "/default-image.jpg"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              {/* 텍스트 영역 */}
              <div className="flex-1 ml-2">
                {/* 주소 */}
                <p className="text-xs text-gray-500 truncate mt-1">
                  {place.address || "주소 정보 없음"}
                </p>

                {/* 제목 + 숫자 */}
                <div className="flex items-center">
                  <p className="text-lg font-bold mr-1">{idx + 1 + startIndex}.</p>
                  <h3 className="text-sm font-bold truncate">
                    {place.placeName || place.pensionName || "이름 정보 없음"}
                  </h3>
                </div>

                {/* 별점 */}
                <p className="text-sm text-gray-500 mt-1">
                  ⭐ {place.reviewAvg?.toFixed(1)} ({place.reviewCount || 0})
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    })}
</div>

    </section>
  );
};

export default HotPlaces;
