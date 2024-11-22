import React, { useState } from "react";
import Calendar from "react-calendar";
import ProfileSection from "./ProfileSection";

const PensionSection = () => {
  const [selectedDateRange, setSelectedDateRange] = useState([new Date(), null]);
  const [sections, setSections] = useState({ location: false, profile: false });

  const handleDateChange = (value) => {
    setSelectedDateRange(value);
  };

  const toggleSection = (section) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="mt-6">
            {/* Location Section */}
            <div className="mt-6">
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
            <div className="grid grid-cols-3 gap-2">
              {[
                "서울",
                "경기권",
                "인천",
                "강원권",
                "충청권",
                "전라권",
                "경상권",
                "제주도",
              ].map((region) => (
                <button
                  key={region}
                  className="p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Date Section */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">언제 갈 건가요?</h3>
        <Calendar
          onChange={handleDateChange}
          value={selectedDateRange}
          selectRange
          className="rounded-lg shadow-md"
        />
        <div className="mt-2 text-sm text-gray-600">
          {selectedDateRange[0] && selectedDateRange[1]
            ? `선택된 날짜: ${selectedDateRange[0].toLocaleDateString()} - ${selectedDateRange[1].toLocaleDateString()}`
            : "날짜를 선택하세요."}
        </div>
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

export default PensionSection;