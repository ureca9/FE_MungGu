import React, { useState, useEffect } from "react";
import ProfileSection from "./ProfileSection";

const FacilitySection = () => {
  const [sections, setSections] = useState({ location: false, activity: false, profile: false });
  const [facilities, setFacilities] = useState([]); // 시설 데이터 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 섹션 열기/닫기 토글
  const toggleSection = (section) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));

    // location 섹션 열릴 때만 데이터 가져오기
    if (section === "location" && !sections.location) {
      fetchFacilities();
    }
  };

  // 데이터 fetch 함수
  const fetchFacilities = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/facilities");
      if (!response.ok) {
        throw new Error("데이터를 가져오는데 실패했습니다.");
      }
      const data = await response.json();
      setFacilities(data.data.item); // 데이터 저장
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      {/* Location Section */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleSection("location")}
      >
        <h3 className="text-lg font-semibold">어디로 놀러갈까요?</h3>
        <span>{sections.location ? "▼" : "▲"}</span>
      </div>
      {sections.location && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="지역 또는 시/군 검색"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />

          {loading ? (
            <p>로딩 중...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {facilities.map((facility) => (
                <div key={facility.id} className="p-3 border border-gray-300 rounded-lg">
                  <img
                    src={facility.img}
                    alt={facility.name}
                    className="w-full h-32 object-cover mb-2"
                  />
                  <h4 className="font-semibold">{facility.name}</h4>
                  <p className="text-sm text-gray-600">{facility.address}</p>
                  <p className="text-sm text-gray-500">⭐ {facility.reviewAvg} ({facility.reviewCount} 리뷰)</p>
                  <p className="text-sm text-gray-500">조회수: {facility.count}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Activity Section */}
      <div className="mt-6">
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
              {["전체", "카페", "식당", "캠핑", "놀이터", "쇼핑", "물놀이"].map((activity) => (
                <button
                  key={activity}
                  className="p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="mt-6">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("profile")}
        >
          <h3 className="text-lg font-semibold">프로필</h3>
          <span>{sections.profile ? "▼" : "▲"}</span>
        </div>
        {sections.profile && (
          <div className="mt-4">
            <ProfileSection />
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilitySection;