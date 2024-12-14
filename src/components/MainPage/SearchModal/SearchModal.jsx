import React, { useState, useEffect } from "react";
import FacilitySection from "./FacilitySection";
import PensionSection from "./PensionSection";

const SearchModal = ({ onClose, defaultTab = "facility" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab); // 현재 활성 탭 (시설/펜션)

  // defaultTab이 변경될 때 activeTab 업데이트
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-end z-50">
      <div
        className="bg-gray-100 w-full rounded-t-lg p-6 overflow-y-auto max-h-[85vh]"
        style={{ maxWidth: "800px" }} // 좌우 크기를 늘리기 위해 maxWidth 조정
      >
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-bold">검색</h2>
          <button onClick={onClose} className="text-gray-500 text-lg">
            ✖
          </button>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "facility" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveTab("facility")}
          >
            시설
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "pension" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveTab("pension")}
          >
            펜션
          </button>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="mt-6">
          {activeTab === "facility" && <FacilitySection onClose={onClose} />}
          {activeTab === "pension" && (
            <PensionSection
              onSearch={(params) => {
                console.log("Pension search params:", params);
                onClose(); // 검색 후 모달 닫기
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
