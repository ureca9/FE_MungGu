import React, { useState } from "react";
import ProfileSection from "./ProfileSection";

const FacilitySection = () => {
  const [sections, setSections] = useState({ location: false, activity: false, profile: false });

  const toggleSection = (section) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="mt-6">
      {/* Location Section */}
      <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("location")}>
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
          <div className="grid grid-cols-3 gap-2">
            {["서울", "경기", "인천", "강원권", "충청권", "전라권", "경상권", "제주도"].map((region) => (
              <button key={region} className="p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
                {region}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Activity Section */}
      <div className="mt-6">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("activity")}>
          <h3 className="text-lg font-semibold">무엇을 하고 놀까요?</h3>
          <span>{sections.activity ? "▼" : "▲"}</span>
        </div>
        {sections.activity && (
          <div className="mt-4">
            <div className="grid grid-cols-3 gap-2">
              {["전체", "카페", "식당", "캠핑", "놀이터", "쇼핑", "물놀이"].map((activity) => (
                <button key={activity} className="p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
                  {activity}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="mt-6">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("profile")}>
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