import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "./Tabs";
import FacilitySection from "./FacilitySection";
import PensionSection from "./PensionSection";

const SearchModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("facility");
  const navigate = useNavigate();

  const handleSearch = (regions, dateRange, activities) => {
    if (activeTab === "facility") {
      navigate("/facility-list", {
        state: { regions, activities },
      });
    } else if (activeTab === "pension") {
      navigate("/pension-list", {
        state: { regions, dateRange },
      });
    }
    onClose(); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
      {/* 모달 컨텐츠 */}
      <div
        className="bg-white w-full max-w-2xl rounded-t-lg p-6 overflow-y-auto max-h-[85vh]"
        style={{
          marginTop: "10vh", // 헤더 영역을 침범하지 않도록 상단 여백 추가
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold">검색</h2>
          <button onClick={onClose} className="text-gray-500">
            ✖
          </button>
        </div>

        {/* Tabs */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Sections */}
        <div className="mt-4">
          {activeTab === "facility" && <FacilitySection onSearch={handleSearch} />}
          {activeTab === "pension" && <PensionSection onSearch={handleSearch} />}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;