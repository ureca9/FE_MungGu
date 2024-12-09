import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router의 navigate 사용
import axios from "axios";
import ProfileSection from "./ProfileSection";

const FacilitySection = ({ onClose }) => { // onClose prop 추가
  const [searchData, setSearchData] = useState({
    searchWord: "",
    regionList: ["전체"], // 기본값
    placeTypes: ["전체"], // 기본값
    heaviestDogWeight: 0,
  });

  const navigate = useNavigate(); // navigate 함수 초기화
  const regions = ["전체", "서울", "경기", "인천", "강원권", "충청권", "경상권", "전라권", "제주권"];
  const categories = ["전체", "카페", "공원", "해수욕장", "섬", "놀이터", "마당"];

  // 지역 선택 핸들러
  const handleRegionSelect = (region) => {
    if (region === "전체") {
      setSearchData((prev) => ({ ...prev, regionList: ["전체"] })); // "전체"만 선택
    } else {
      setSearchData((prev) => {
        const isSelected = prev.regionList.includes(region);
        const updatedRegions = isSelected
          ? prev.regionList.filter((r) => r !== region)
          : prev.regionList.filter((r) => r !== "전체").concat(region); // "전체" 제거 후 추가
        return { ...prev, regionList: updatedRegions };
      });
    }
  };
  
  // 카테고리 선택 핸들러
  const handleCategorySelect = (category) => {
    if (category === "전체") {
      setSearchData((prev) => ({ ...prev, placeTypes: ["전체"] })); // "전체"만 선택
    } else {
      setSearchData((prev) => {
        const isSelected = prev.placeTypes.includes(category);
        const updatedCategories = isSelected
          ? prev.placeTypes.filter((c) => c !== category)
          : prev.placeTypes.filter((c) => c !== "전체").concat(category); // "전체" 제거 후 추가
        return { ...prev, placeTypes: updatedCategories };
      });
    }
  };
  
  // 검색 버튼 핸들러
  const handleSearch = () => {
    const queryParams = new URLSearchParams();
  
    if (searchData.searchWord) {
      queryParams.append("searchWord", searchData.searchWord);
    }
  
    searchData.regionList.forEach((region) => {
      queryParams.append("regionList", region);
    });
  
    searchData.placeTypes.forEach((placeType) => {
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
        
        console.log("Navigating with data:", response.data.data.placeInfo);
        // ListPage로 이동하며 검색 결과 전달
        navigate("/facility-list", {
          state: {
            results, // 검색 결과 데이터
            filters: searchData, // 검색 조건 데이터
          },
        });

        if (onClose) onClose(); // 검색 성공 시 모달 닫기
      })
      .catch((error) => {
        console.error("Error during search:", error);
        alert("검색 중 문제가 발생했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* 지역 검색 섹션 */}
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

      {/* 카테고리 섹션 */}
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
      {/* 프로필 섹션 */}
      <div className="mb-6">
        <ProfileSection
          setMaxDogWeight={(weight) =>
            setSearchData((prev) => ({ ...prev, heaviestDogWeight: weight }))
          }
        />
      </div>
      {/* 검색 버튼 */}
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
