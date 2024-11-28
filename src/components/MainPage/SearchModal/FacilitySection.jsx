import React, { useState } from "react";
import ProfileSection from "./ProfileSection";

const FacilitySection = ({ onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태
  const [selectedRegions, setSelectedRegions] = useState([]); // 선택된 지역
  const [selectedActivities, setSelectedActivities] = useState([]); // 선택된 활동
  const [profileVisible, setProfileVisible] = useState(false); // 프로필 섹션 가시성

  const regions = ["서울", "경기", "인천", "강원권", "충청권", "경상권", "전라권", "제주권"];
  const activities = ["전체", "카페", "식당", "캠핑", "놀이터", "쇼핑", "물놀이"];

  const handleRegionSelect = (region) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions((prev) => prev.filter((selected) => selected !== region));
    } else if (selectedRegions.length < 3) {
      setSelectedRegions((prev) => [...prev, region]);
    }
  };

  const handleActivitySelect = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities((prev) => prev.filter((selected) => selected !== activity));
    } else if (selectedActivities.length < 3) {
      setSelectedActivities((prev) => [...prev, activity]);
    }
  };

  const handleSearch = () => {
    // `onSearch` 콜백으로 모든 데이터를 전달
    onSearch(searchKeyword, selectedRegions, selectedActivities);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* 검색어 입력 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">검색어를 입력해주세요</h3>
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2"
        />
      </div>

      {/* 지역 섹션 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">어디로 놀러갈까요?</h3>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => handleRegionSelect(region)}
              className={`p-3 border rounded-lg ${
                selectedRegions.includes(region) ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {region}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-4">
          선택된 지역: {selectedRegions.length > 0 ? selectedRegions.join(", ") : "선택된 지역 없음"}
        </p>
      </div>

      {/* 활동 섹션 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">무엇을 하고 놀까요?</h3>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {activities.map((activity) => (
            <button
              key={activity}
              onClick={() => handleActivitySelect(activity)}
              className={`p-3 border rounded-lg ${
                selectedActivities.includes(activity) ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              {activity}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-4">
          선택된 활동: {selectedActivities.length > 0 ? selectedActivities.join(", ") : "선택된 활동 없음"}
        </p>
      </div>

      {/* 프로필 섹션 */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setProfileVisible(!profileVisible)}
        >
          <h3 className="text-lg font-semibold">누구와 함께 가나요?</h3>
          <span>{profileVisible ? "▼" : "▲"}</span>
        </div>
        {profileVisible && (
          <div className="mt-4">
            <ProfileSection />
          </div>
        )}
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