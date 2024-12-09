import React, { useState } from "react";
import Calendar from "react-calendar";
import ProfileSection from "./ProfileSection"; // ProfileSection 추가 import
import "./PensionSection.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PensionSection = ({ onClose }) => {
  const [searchWord, setSearchWord] = useState(""); // 검색어
  const [selectedRegion, setSelectedRegion] = useState(""); // 선택된 지역
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]); // 선택된 날짜
  const [heaviestDogWeight, setHeaviestDogWeight] = useState(0); // 최대 반려동물 무게
  const [weatherData, setWeatherData] = useState([]); // 날씨 데이터
  const navigate = useNavigate();

  const regions = ["서울", "경기", "인천", "강원", "충청", "전라", "경상", "제주"];

  const handleRegionSelect = (region) => {
    setSelectedRegion(region === selectedRegion ? "" : region); // 선택된 지역 토글

    if (region !== selectedRegion) {
      fetchWeatherData(region); // 날씨 데이터 가져오기
    } else {
      setWeatherData([]); // 선택 해제 시 데이터 초기화
    }
  };

  const fetchWeatherData = async (region) => {
    try {
      const response = await axios.get(
        `https://meong9.store/api/v1/weather?region=${region}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data.data;
      const weather = Object.values(data).slice(1, 11); // day1~day10 날씨 데이터 추출
      setWeatherData(weather);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      alert("날씨 데이터를 가져오는 데 문제가 발생했습니다.");
    }
  };

  const handleDateChange = (value) => {
    setSelectedDateRange(value);
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "맑음":
        return "☀️";
      case "흐림":
        return "⛅";
        case "구름많음":
          return "⛅";
      case "비/눈":
        return "🌧️";
      case "비":
        return "🌧️";
      case "눈":
        return "❄️";
      default:
        return "🌈";
    }
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const today = new Date();
    const dayDifference = Math.floor(
      (date - today) / (1000 * 60 * 60 * 24)
    );

    if (dayDifference >= 0 && dayDifference < weatherData.length) {
      const weather = weatherData[dayDifference];
      return (
        <div className="weather-icon">
          {weather && getWeatherIcon(weather)}
        </div>
      );
    }
    return null;
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (searchWord) queryParams.append("searchWord", searchWord);
    if (selectedRegion) queryParams.append("regionList", selectedRegion);
    if (heaviestDogWeight)
      queryParams.append("heaviestDogWeight", heaviestDogWeight);
    if (selectedDateRange[0])
      queryParams.append(
        "startDate",
        selectedDateRange[0].toISOString().split("T")[0]
      );
    if (selectedDateRange[1])
      queryParams.append(
        "endDate",
        selectedDateRange[1].toISOString().split("T")[0]
      );

    const url = `https://meong9.store/api/v1/search/pensions?${queryParams.toString()}`;

    axios
      .get(url)
      .then((response) => {
        const results = response.data.data.pensionInfo;

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

        if (onClose) onClose();
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
        <h3 className="text-lg font-semibold">어디로 놀러갈까요?</h3>
        <input
          type="text"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="지역 또는 펜션 검색"
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
      { (
        <div className="mb-6">
          <h3 className="text-lg font-semibold">언제 갈 건가요?</h3>
          <Calendar
            onChange={handleDateChange}
            value={selectedDateRange}
            selectRange
            tileContent={tileContent}
            className="react-calendar"
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
        <ProfileSection setMaxDogWeight={(weight) => setHeaviestDogWeight(weight)} />
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
