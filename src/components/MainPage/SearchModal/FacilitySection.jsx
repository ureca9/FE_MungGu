import React, { useState } from "react";
import ProfileSection from "./ProfileSection";

const FacilitySection = () => {
  const [sections, setSections] = useState({
    location: true,
    activity: false,
    profile: false,
  });
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태
  const [selectedRegions, setSelectedRegions] = useState([]); // 선택된 지역
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 지역 리스트
  const regions = [
    "서울",
    "경기",
    "인천",
    "강원권",
    "충청권",
    "경상권",
    "전라권",
    "제주권",
  ];

  const toggleSection = (section) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleRegionSelect = (region) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions((prev) =>
        prev.filter((selected) => selected !== region)
      );
    } else if (selectedRegions.length < 3) {
      setSelectedRegions((prev) => [...prev, region]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value); // 검색어 상태 업데이트
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* 검색창 */}
      <div className="mb-6">
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearchChange}
          placeholder="지역 또는 키워드 검색"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* 지역 섹션 */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("location")}
        >
          <h3 className="text-lg font-semibold">어디로 놀러갈까요?</h3>
          <span>{sections.location ? "▼" : "▲"}</span>
        </div>
        {sections.location && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">
              최대 3개의 지역을 선택할 수 있습니다.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {regions
                .filter((region) =>
                  region.includes(searchKeyword) // 검색어에 따라 필터링
                )
                .map((region) => (
                  <button
                    key={region}
                    onClick={() => handleRegionSelect(region)}
                    className={`p-3 border rounded-lg text-center ${
                      selectedRegions.includes(region)
                        ? "bg-blue-500 text-white"
                        : "border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {region}
                  </button>
                ))}
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                선택된 지역:{" "}
                {selectedRegions.length > 0
                  ? selectedRegions.join(", ")
                  : "선택된 지역 없음"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 활동 섹션 */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("activity")}
        >
          <h3 className="text-lg font-semibold">무엇을 하고 놀까요?</h3>
          <span>{sections.activity ? "▼" : "▲"}</span>
        </div>
        {sections.activity && (
          <div className="mt-4">
            <div className="grid grid-cols-3 gap-2">
              {["전체", "카페", "식당", "캠핑", "놀이터", "쇼핑", "물놀이"].map(
                (activity) => (
                  <button
                    key={activity}
                    className="p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
                  >
                    {activity}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {/* 프로필 섹션 */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("profile")}
        >
          <h3 className="text-lg font-semibold">누구와 함께 가나요?</h3>
          <span>{sections.profile ? "▼" : "▲"}</span>
        </div>
        {sections.profile && <ProfileSection />}
      </div>

      {/* 검색 버튼 */}
      <div className="mt-6">
        <button
          className="w-full p-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          disabled={selectedRegions.length === 0}
        >
          검색하기
        </button>
      </div>
    </div>
  );
};

export default FacilitySection;