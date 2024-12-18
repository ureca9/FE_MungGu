import React, { useState , useEffect} from "react";
import Calendar from "react-calendar";
import ProfileSection from "./ProfileSection";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "./PensionSection.css"; 

const PensionSection = ({ onClose }) => {
  const [searchWord, setSearchWord] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [heaviestDogWeight, setHeaviestDogWeight] = useState(0);
  const [weatherData, setWeatherData] = useState([]);
  const [activeSection, setActiveSection] = useState("combined");
  const navigate = useNavigate();

  const regions = ["서울", "경기", "인천", "강원권", "충청권", "전라권", "경상권", "제주권"];

  useEffect(() => {
    console.log("Updated heaviestDogWeight:", heaviestDogWeight);
  }, [heaviestDogWeight]);

  const handleRegionSelect = async (region) => {
    setSelectedRegion(region === selectedRegion ? "" : region);
    if (region !== selectedRegion) {
      await fetchWeatherData(region);
    } else {
      setWeatherData([]);
    }
  };

  const fetchWeatherData = async (region) => {
    try {
      const response = await axios.get(
        `https://meong9.store/api/v1/weather?region=${region}`,
        {
          headers: { Accept: "application/json", "Content-Type": "application/json" },
        }
      );
      const data = response.data.data;
      const weather = Object.values(data).slice(1, 11); // day1~day10 날씨 데이터 추출
      setWeatherData(weather);
    } catch (error) {
      console.error("[PensionSection] 날씨 데이터 요청 실패:", error);
      alert("날씨 정보를 불러오는데 실패했습니다. 잠시 후 다시 시도해 주세요.");
      setWeatherData([]);
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
    const normalizedToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const normalizedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const dayDifference = Math.floor(
      (normalizedDate - normalizedToday) / (1000 * 60 * 60 * 24)
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
    if (heaviestDogWeight) queryParams.append("heaviestDogWeight", heaviestDogWeight);
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
  
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };
  
    axios
      .get(url, { headers })
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
  
  

  const renderSelectedSummary = (section) => {
    switch (section) {
      case "region":
        return selectedRegion || "선택되지 않음";
      case "date":
        return selectedDateRange[0]
          ? `${selectedDateRange[0].toLocaleDateString()} - ${
              selectedDateRange[1]?.toLocaleDateString() || ""
            }`
          : "선택되지 않음";
      case "profile":
        return heaviestDogWeight > 0
          ? `최대 ${heaviestDogWeight}kg`
          : "선택되지 않음"; // 선택된 무게 반영
      default:
        return null;
    }
  };

  

  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-lg shadow-md">
      <div className="p-4 bg-white rounded-lg shadow-sm mb-3">
  <h3
    className="text-lg font-semibold mb-2 cursor-pointer flex justify-between items-center"
    onClick={() =>
      setActiveSection((prev) => (prev === "combined" ? null : "combined"))
    }
  >
    어디로 놀러갈까요?
    <span className="text-sm text-gray-500">
      {renderSelectedSummary("region")}
    </span>
  </h3>

  {/* 섹션 내용 */}
  <div
    className={`overflow-hidden transition-all duration-300 ${
      activeSection === "combined" ? "max-h-[500px]" : "max-h-0"
    }`}
  >
    {/* 검색창 */}
    <div className="mb-4 relative">
  <input
    type="text"
    value={searchWord}
    onChange={(e) => setSearchWord(e.target.value)}
    placeholder="지역 또는 펜션 검색"
    className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  {/* SVG 아이콘 추가 */}
  <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
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

    {/* 지역 선택 */}
    <div className="grid grid-cols-2 gap-2">
      {regions.map((region) => (
        <button
          key={region}
          onClick={() => handleRegionSelect(region)}
          className={`p-2 text-sm rounded-lg border ${
            selectedRegion === region
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black"
          }`}
        >
          {region}
        </button>
      ))}
    </div>

    {/* 다음 버튼 */}
    <button
      className="w-full mt-4 bg-white text-[#3288FF] border border-[#3288FF] py-2 rounded-lg"
      onClick={() => setActiveSection("date")}
    >
      다음
    </button>
  </div>
</div>



      <div className="p-4 bg-white rounded-lg shadow-sm mb-3">
        <h3
          className="text-lg font-semibold mb-2 cursor-pointer flex justify-between items-center"
          onClick={() => setActiveSection("date")}
        >
          언제 갈 건가요?
          <span className="text-sm text-gray-500">{renderSelectedSummary("date")}</span>
        </h3>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            activeSection === "date" ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <Calendar
  onChange={handleDateChange}
  value={selectedDateRange}
  selectRange
  tileContent={tileContent}
  tileClassName={({ date, view }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 오늘 날짜의 시간을 00:00:00으로 설정
    
    if (view === "month") {
      if (date < today) {
        // 오늘 이전 날짜
        return "past-date";
      }
      if (date.getDay() === 6) {
        // 토요일
        return "highlight-saturday";
      }
    }
    return null;
  }}
  className="react-calendar"
/>

<button
  className="w-full mt-4 bg-white text-[#3288FF] border border-[#3288FF] py-2 rounded-lg"
  onClick={() => setActiveSection("profile")}
>
  다음
</button>

</div>
</div> {/* 닫히지 않은 div를 여기서 마무리 */}

      {/* 프로필 섹션 */}
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
  setMaxDogWeight={(weight) => setHeaviestDogWeight(weight)}
  onComplete={(selectedProfile) => {
    if (selectedProfile) {
      setTimeout(() => { // 비동기 상태 업데이트
        setHeaviestDogWeight(selectedProfile.weight);
      }, 0);
    }
    setActiveSection("none");
  }}
/>

        </div>
      </div>

      {/* 검색 버튼 */}
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

export default PensionSection;
