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

  const [activeSection, setActiveSection] = useState("region"); 
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
        return { ...prev, regionList: ["전체"] };
      } else {
        const isSelected = prev.regionList.includes(region);
        let updatedRegions = isSelected
          ? prev.regionList.filter((r) => r !== region)
          : prev.regionList.filter((r) => r !== "전체").concat(region);

        if (updatedRegions.length === 0) updatedRegions = ["전체"];
        return { ...prev, regionList: updatedRegions };
      }
    });
  };

  const handleCategorySelect = (category) => {
    setSearchData((prev) => {
      if (category === "전체") {
        return { ...prev, placeTypes: ["전체"] };
      }
      const isSelected = prev.placeTypes.includes(category);
      let updatedCategories = isSelected
        ? prev.placeTypes.filter((c) => c !== category)
        : prev.placeTypes.filter((c) => c !== "전체").concat(category);

      if (updatedCategories.length === 0) updatedCategories = ["전체"];
      return { ...prev, placeTypes: updatedCategories };
    });
  };

  const renderSelectedSummary = (section) => {
    if (activeSection === section) return null; 

    switch (section) {
      case "region":
        return searchData.regionList.join(", "); 
      case "category":
        return searchData.placeTypes.join(", "); 
      case "profile":
        return searchData.heaviestDogWeight > 0
          ? `최대 ${searchData.heaviestDogWeight}kg`
          : "선택되지 않음";
      default:
        return null;
    }
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
  
    if (searchData.searchWord) {
      queryParams.append("searchWord", searchData.searchWord);
    } else {
      const filteredRegions =
        searchData.regionList.includes("전체") || searchData.regionList.length === 0
          ? []
          : searchData.regionList;
  
      filteredRegions.forEach((region) => queryParams.append("regionList", region));
    }
  
    const filteredCategories =
      searchData.placeTypes.includes("전체") || searchData.placeTypes.length === 0
        ? []
        : searchData.placeTypes;
  
    filteredCategories.forEach((placeType) => queryParams.append("placeTypes", placeType));
  
    if (searchData.heaviestDogWeight) {
      queryParams.append("heaviestDogWeight", searchData.heaviestDogWeight);
    }
  
    const url = `https://meong9.store/api/v1/search/places?${queryParams.toString()}`;
  
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
  
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
  
    axios
      .get(url, { headers })
      .then((response) => {
        const results = response.data.data.placeInfo;
        navigate("/facility-list", {
          state: { results, filters: searchData },
        });
        if (onClose) onClose();
      })
      .catch((error) => {
        console.error("Error during search:", error);
        alert("검색 중 문제가 발생했습니다. 다시 시도해주세요.");
      });
  };
  

  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-lg shadow-md">


<div className="p-4 bg-white rounded-lg shadow-sm mb-3">
  <h3
    className="text-lg font-semibold mb-2 cursor-pointer flex justify-between items-center"
    onClick={() =>
      setActiveSection((prev) => (prev === "where" ? null : "where"))
    }
  >
    어디로 놀러갈까요?
    <span className="text-sm text-gray-500">{renderSelectedSummary("region")}</span>
  </h3>

  <div
    className={`overflow-hidden transition-all duration-300 ${
      activeSection === "where" || activeSection === "region" ? "max-h-[500px]" : "max-h-0"
    }`}
  >
    <div className="mb-4 relative">
  <input
    type="text"
    value={searchData.searchWord}
    onChange={(e) =>
      setSearchData((prev) => ({ ...prev, searchWord: e.target.value }))
    }
    placeholder="지역 또는 시설 검색"
    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:none pr-10" // padding-right 추가
  />
  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-5 h-5 text-gray-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M16.5 9.75a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0z"
      />
    </svg>
  </div>
</div>


    <div className="mb-2">
      <button
        onClick={() => handleRegionSelect("전체")}
        className={`w-full p-2 text-sm rounded-lg border ${
          searchData.regionList.includes("전체")
            ? "bg-black text-white border-black"
            : "bg-white text-black border-black"
        }`}
      >
        전체
      </button>
    </div>
    <div className="grid grid-cols-2 gap-2">
      {regions.slice(1).map((region) => (
        <button
          key={region}
          onClick={() => handleRegionSelect(region)}
          className={`p-2 text-sm rounded-lg border ${
            searchData.regionList.includes(region)
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black"
          }`}
        >
          {region}
        </button>
      ))}
    </div>

    <button
      className="w-full mt-4 bg-white text-[#3288FF] border border-[#3288FF] py-2 rounded-lg"
      onClick={() => setActiveSection("category")}
    >
      다음
    </button>
  </div>
</div>


      <div className="p-4 bg-white rounded-lg shadow-sm mb-3">
        <h3
          className="text-lg font-semibold mb-2 cursor-pointer flex justify-between items-center"
          onClick={() => setActiveSection("category")}
        >
          무엇을 하고 놀까요?
          <span className="text-sm text-gray-500">{renderSelectedSummary("category")}</span>
        </h3>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            activeSection === "category" ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="mb-2">
            <button
              onClick={() => handleCategorySelect("전체")}
              className={`w-full p-2 text-sm rounded-lg border ${
                searchData.placeTypes.includes("전체")
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-black"
              }`}
            >
              전체
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {categories.slice(1).map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`p-2 text-sm rounded-lg border ${
                  searchData.placeTypes.includes(category)
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <button
            className="w-full mt-4 bg-white text-[#3288FF] border border-[#3288FF] py-2 rounded-lg"
            onClick={() => setActiveSection("profile")}
          >
            다음
          </button>
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg shadow-sm mb-3">
        <h3
          className="text-lg font-semibold mb-2 cursor-pointer flex justify-between items-center"
          onClick={() => setActiveSection("profile")}
        >
          누구랑 함께 가나요?
          <span className="text-sm text-gray-500">{renderSelectedSummary("profile")}</span>
        </h3>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            activeSection === "profile" ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <ProfileSection
            setMaxDogWeight={(weight) =>
              setSearchData((prev) => ({ ...prev, heaviestDogWeight: weight }))
            }
            onComplete={() => setActiveSection(null)} 
          />
        </div>
      </div>

      <div className="p-3 border-t bg-white">
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white py-2 rounded-lg text-lg font-bold"
        >
          검색하기
        </button>
      </div>
    </div>
  );
};

export default FacilitySection;
