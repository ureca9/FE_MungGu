import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileSection from "./ProfileSection";

const FacilitySection = ({ onClose }) => {
  const [searchData, setSearchData] = useState({
    searchWord: "",
    regionList: ["전체"],
    placeTypes: ["전체"],
    heaviestDogWeight: 0,
  });

  const navigate = useNavigate();
  const regions = [
    "전체",
    "서울",
    "경기",
    "인천",
    "강원권",
    "충청권",
    "경상권",
    "전라권",
    "제주권",
  ];
  const categories = ["전체", "카페", "공원", "해수욕장", "섬", "놀이터", "마당"];

  const handleRegionSelect = (region) => {
    setSearchData((prev) => {
      if (region === "전체") {
        // "전체" 선택 시 모든 다른 선택을 해제
        return { ...prev, regionList: ["전체"] };
      } else {
        const isSelected = prev.regionList.includes(region);
        let updatedRegions;
        if (isSelected) {
          // 이미 선택된 지역 클릭 시 해제
          updatedRegions = prev.regionList.filter((r) => r !== region);
        } else {
          // 새로운 지역 선택 시 "전체" 제외 후 추가
          updatedRegions = prev.regionList
            .filter((r) => r !== "전체")
            .concat(region);
        }
  
        // 모든 선택이 해제되었을 때 "전체"로 초기화
        if (updatedRegions.length === 0) {
          updatedRegions = ["전체"];
        }
  
        return { ...prev, regionList: updatedRegions };
      }
    });
  };

  const handleCategorySelect = (category) => {
    setSearchData((prev) => {
      if (category === "전체") {
        // "전체"를 선택하면 나머지 선택 초기화
        return { ...prev, placeTypes: ["전체"] };
      }
  
      const isSelected = prev.placeTypes.includes(category);
      let updatedCategories;
  
      if (isSelected) {
        // 이미 선택된 카테고리를 클릭하면 해제
        updatedCategories = prev.placeTypes.filter((c) => c !== category);
      } else {
        // 새로운 카테고리를 선택하면 "전체"를 제외하고 추가
        updatedCategories = prev.placeTypes
          .filter((c) => c !== "전체")
          .concat(category);
      }
  
      // 아무것도 선택하지 않으면 "전체"로 초기화
      if (updatedCategories.length === 0) {
        updatedCategories = ["전체"];
      }
  
      return { ...prev, placeTypes: updatedCategories };
    });
  };
  

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (searchData.searchWord) {
      queryParams.append("searchWord", searchData.searchWord);
    }

    const filteredRegions =
      searchData.regionList.includes("전체") || searchData.regionList.length === 0
        ? []
        : searchData.regionList;

    filteredRegions.forEach((region) => {
      queryParams.append("regionList", region);
    });

    const filteredCategories =
      searchData.placeTypes.includes("전체") || searchData.placeTypes.length === 0
        ? []
        : searchData.placeTypes;

    filteredCategories.forEach((placeType) => {
      queryParams.append("placeTypes", placeType);
    });

    if (searchData.heaviestDogWeight) {
      queryParams.append("heaviestDogWeight", searchData.heaviestDogWeight);
    }

    const url = `https://meong9.store/api/v1/search/places?${queryParams.toString()}`;

    axios
      .get(url)
      .then((response) => {
        const results = response.data.data.placeInfo;

        navigate("/facility-list", {
          state: {
            results,
            filters: searchData,
          },
        });

        if (onClose) onClose();
      })
      .catch((error) => {
        console.error("Error during search:", error);
        alert("검색 중 문제가 발생했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">어디로 놀러갈까요?</h3>
        <input
          type="text"
          value={searchData.searchWord}
          onChange={(e) =>
            setSearchData((prev) => ({ ...prev, searchWord: e.target.value }))
          }
          placeholder="지역 또는 시설 검색"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2"
        />
        <div className="grid grid-cols-4 gap-2 mt-4">
          <button
            onClick={() => handleRegionSelect("전체")}
            className={`p-3 border rounded-lg col-span-4 text-center ${
              searchData.regionList.includes("전체")
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            전체
          </button>
          {regions.slice(1).map((region) => (
            <button
              key={region}
              onClick={() => handleRegionSelect(region)}
              className={`p-3 border rounded-lg ${
                searchData.regionList.includes(region)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">어떤 카테고리를 선택할까요?</h3>
        <div className="grid grid-cols-3 gap-2 mt-2">
          <button
            onClick={() => handleCategorySelect("전체")}
            className={`p-3 border rounded-lg col-span-3 text-center ${
              searchData.placeTypes.includes("전체")
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            전체
          </button>
          {categories.slice(1).map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`p-3 border rounded-lg ${
                searchData.placeTypes.includes(category)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <ProfileSection
          setMaxDogWeight={(weight) =>
            setSearchData((prev) => ({ ...prev, heaviestDogWeight: weight }))
          }
        />
      </div>

      <div className="mt-6">
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white p-3 rounded-lg"
        >
          검색하기
        </button>
      </div>
    </div>
  );
};

export default FacilitySection;