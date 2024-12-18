import React, { useState, useEffect } from "react";
import FacilitySection from "./FacilitySection";
import PensionSection from "./PensionSection";

const SearchModal = ({ onClose, defaultTab = "facility" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setActiveTab(defaultTab);
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 10);
    return () => clearTimeout(timer);
  }, [defaultTab]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-end z-50">
      <div
        className={`bg-gray-100 w-full rounded-t-lg p-6 transition-transform duration-300 ${
          isAnimating ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxWidth: "770px" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-bold">검색</h2>
          <button onClick={handleClose} className="text-gray-500 text-lg">
            ✖
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "facility"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveTab("facility")}
          >
            시설
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "pension"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveTab("pension")}
          >
            펜션
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 overflow-hidden">
          {activeTab === "facility" && <FacilitySection onClose={handleClose} />}
          {activeTab === "pension" && <PensionSection onClose={handleClose} />}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
