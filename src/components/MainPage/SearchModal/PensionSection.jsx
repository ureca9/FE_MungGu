import React, { useState } from "react";
import Calendar from "react-calendar";
import ProfileSection from "./ProfileSection";
import "./PensionSection.css";

const PensionSection = ({ onSearch }) => {
  const [selectedRegion, setSelectedRegion] = useState(""); // 선택된 지역
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // 달력 가시성
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]); // 선택된 날짜
  const [profileVisible, setProfileVisible] = useState(false); // 프로필 섹션 가시성

  const regions = ["서울", "경기권", "인천", "강원권", "충청권", "전라권", "경상권", "제주도"];

  const handleRegionSelect = (region) => {
    setSelectedRegion(region === selectedRegion ? "" : region); // 선택된 지역 토글
    setIsCalendarVisible(true); // 달력 열기
  };

  const handleDateChange = (value) => {
    setSelectedDateRange(value);
  };

  const isDateInRange = (date) => {
    if (!selectedDateRange[0] || !selectedDateRange[1]) return false;
    const startDate = selectedDateRange[0];
    const endDate = selectedDateRange[1];
    return date > startDate && date < endDate;
  };

  const isStartDate = (date) => {
    return (
      selectedDateRange[0] &&
      date.toISOString().split("T")[0] === selectedDateRange[0].toISOString().split("T")[0]
    );
  };

  const isEndDate = (date) => {
    return (
      selectedDateRange[1] &&
      date.toISOString().split("T")[0] === selectedDateRange[1].toISOString().split("T")[0]
    );
  };

  const isSingleSelectedDate = (date) => {
    return selectedDateRange[0] && !selectedDateRange[1] && isStartDate(date);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* 지역 선택 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">어디로 놀러갈까요?</h3>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => handleRegionSelect(region)}
              className={`p-3 border rounded-lg ${
                selectedRegion === region ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {region}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-4">
          선택된 지역: {selectedRegion || "선택된 지역 없음"}
        </p>
      </div>

      {/* 달력 섹션 */}
      {isCalendarVisible && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold">언제 갈 건가요?</h3>
          <Calendar
            onChange={handleDateChange}
            value={selectedDateRange}
            selectRange
            className="react-calendar"
            tileClassName={({ date, view }) => {
              if (view !== "month") return "";
              if (isStartDate(date)) return "start-date";
              if (isEndDate(date)) return "end-date"; // 종료 날짜 확인 수정
              if (isSingleSelectedDate(date)) return "single-date"; // 시작 날짜만 선택했을 때 효과
              if (isDateInRange(date)) return "in-range";
              return "";
            }}
          />
          <div className="mt-2 text-sm text-gray-600">
            {selectedDateRange[0] && selectedDateRange[1]
              ? `선택된 날짜: ${selectedDateRange[0].toLocaleDateString()} - ${selectedDateRange[1].toLocaleDateString()}`
              : selectedDateRange[0]
              ? `선택된 날짜: ${selectedDateRange[0].toLocaleDateString()}`
              : "날짜를 선택하세요."}
          </div>
        </div>
      )}

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
          onClick={() => onSearch(selectedRegion, selectedDateRange)}
          className="w-full bg-blue-500 text-white p-3 rounded-lg"
        >
          검색하기
        </button>
      </div>
    </div>
  );
};

export default PensionSection;
