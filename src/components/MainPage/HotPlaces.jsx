import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";

const HotPlaces = ({ accessToken, refreshAccessToken }) => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(1); 
  const scrollRef = useRef(null); 
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "공원", apiPath: "/api/v1/places/1/top" },
    { id: 2, name: "관광지", apiPath: "/api/v1/places/2/top" },
    { id: 3, name: "놀이터", apiPath: "/api/v1/places/3/top" },
    { id: 4, name: "카페", apiPath: "/api/v1/places/4/top" },
    { id: 5, name: "해수욕장", apiPath: "/api/v1/places/5/top" },
    { id: 6, name: "마당", apiPath: "/api/v1/places/6/top" },
    { id: 7, name: "펜션", apiPath: "/api/v1/pensions/top" },
  ];

  const fetchPlaces = async () => {
    try {
      let token = accessToken || localStorage.getItem("ACCESS_TOKEN");

      if (!token) {
        console.error("로그인이 필요합니다.");
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

      if (!selectedApiPath) {
        throw new Error("유효하지 않은 카테고리입니다.");
      }

      const response = await axios.get(`https://meong9.store${selectedApiPath}`, {
        headers,
      });

      setPlaces(response.data.data || []);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("401 Unauthorized: 토큰 만료 또는 인증 실패");
        if (refreshAccessToken) {
          try {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
              localStorage.setItem("ACCESS_TOKEN", newAccessToken);
              console.log("새로운 토큰으로 재요청 시도");
              await fetchPlaces();
            } else {
              setError("로그인이 필요합니다.");
            }
          } catch (refreshError) {
            console.error("리프레시 토큰 오류:", refreshError);
            setError("로그인이 필요합니다.");
          }
        } else {
          setError("로그인이 필요합니다.");
        }
      } else {
        console.error("데이터를 가져오는데 실패했습니다:", error.message);
        setError("데이터를 가져오는데 실패했습니다.");
      }
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

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="p-4">
      <LoadingSpinner /> 
      <h2 className="text-lg font-bold mb-4">지금 핫한 장소 🔥</h2>

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 border rounded-full ${
              selectedCategory === category.id
                ? "border-blue-500 text-blue-500 font-semibold"
                : "border-gray-300 text-gray-600"
            } hover:bg-gray-100`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md hover:bg-blue-600 z-10"
        >
          ◀
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#3288ff] scrollbar-track-gray-200"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {places.length > 0 &&
            [...Array(Math.ceil(places.length / 9))].map((_, index) => {
              const startIndex = index * 9;
              const gridItems = places.slice(startIndex, startIndex + 9);

              return (
                <div
                  key={index}
                  className="grid grid-cols-3 grid-rows-3 gap-6 min-w-[calc(100%+20%)] scroll-snap-align-start"
                >
                  {gridItems.map((place) => (
                    <div
                      key={place.placeId || place.pensionId}
                      className="p-5 bg-white shadow-md rounded-lg text-center cursor-pointer w-100 h-100 flex flex-col justify-between"
                      onClick={() => handleItemClick(place)}
                    >
                      <div
                        className="bg-gray-300 w-full h-36 rounded-lg mb-2 flex-shrink-0"
                        style={{
                          backgroundImage: `url(${place.placeImageUrl || place.pensionImageUrl || "/default-image.jpg"})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <h3 className="text-sm font-bold line-clamp-2 h-12">
                        {place.placeName || place.pensionName}
                      </h3>
                      <p className="text-xs text-gray-500 truncate h-5">
                        {place.province} {place.cityDistrict} {place.subDistrict}
                      </p>
                      <p className="text-sm text-yellow-500 mt-1 h-5">
                        ⭐ {place.reviewAvg.toFixed(1)} ({place.reviewCount} 리뷰)
                      </p>
                    </div>
                  ))}
                </div>
              );
            })}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md hover:bg-blue-600 z-10"
        >
          ▶
        </button>
      </div>
    </section>
  );
};

export default HotPlaces;
