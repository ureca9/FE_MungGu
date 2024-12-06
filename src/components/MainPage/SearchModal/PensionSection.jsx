import React, { useState } from "react";
import Calendar from "react-calendar";
import ProfileSection from "./ProfileSection"; // ProfileSection 추가 import
import "./PensionSection.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PensionSection = ({ onClose }) => {
  const [searchWord, setSearchWord] = useState(""); // 검색어
  const [selectedRegion, setSelectedRegion] = useState(""); // 선택된 지역
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // 달력 가시성
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]); // 선택된 날짜
  const [heaviestDogWeight, setHeaviestDogWeight] = useState(0); // 최대 반려동물 무게
  const [profileVisible, setProfileVisible] = useState(false); // 프로필 섹션 가시성
  const navigate = useNavigate();

  const regions = ["서울", "경기", "인천", "강원", "충청", "전라", "경상", "제주"];

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

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
  
    // 검색어
    if (searchWord) {
      queryParams.append("searchWord", searchWord);
    }
  
    // 지역
    if (selectedRegion) {
      queryParams.append("regionList", selectedRegion);
    }
  
    // 최대 반려동물 무게
    if (heaviestDogWeight) {
      queryParams.append("heaviestDogWeight", heaviestDogWeight);
    }
  
    // 시작 및 종료 날짜
    if (selectedDateRange[0]) {
      queryParams.append("startDate", selectedDateRange[0].toISOString().split("T")[0]);
    }
    if (selectedDateRange[1]) {
      queryParams.append("endDate", selectedDateRange[1].toISOString().split("T")[0]);
    }
  
    const url = `https://meong9.store/api/v1/search/pensions?${queryParams.toString()}`;
  
    axios
      .get(url)
      .then((response) => {
        const results = response.data.data.pensionInfo;
  
        console.log("Navigating with data:", results);
  
        navigate("/pension-list", {
          state: {
            results,
            filters: {
              searchWord,
              regionList: selectedRegion ? [selectedRegion] : [],
              heaviestDogWeight,
              startDate: selectedDateRange[0]?.toISOString().split("T")[0] || "",
              endDate: selectedDateRange[1]?.toISOString().split("T")[0] || "",
            },
          },
        });
  
        if (onClose) onClose(); // 부모 컴포넌트에서 전달된 onSearch 콜백 실행
      })
      .catch((error) => {
        console.error("Error during search:", error);
        alert("검색 중 문제가 발생했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* 검색어 입력 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">검색어</h3>
        <input
          type="text"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="w-full p-3 border border-gray-300 rounded-lg mt-2"
        />
      </div>

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
            <ProfileSection setMaxDogWeight={(weight) => setHeaviestDogWeight(weight)} />
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

export default PensionSection;