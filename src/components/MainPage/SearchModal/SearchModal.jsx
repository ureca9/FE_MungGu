import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "./Tabs";
import FacilitySection from "./FacilitySection";
import PensionSection from "./PensionSection";
import FooterButton from "./FooterButton";

const SearchModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("facility");
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (activeTab === "facility") {
      navigate("/facility-list");
    } else if (activeTab === "pension") {
      navigate("/pension-list");
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end">
      <div
        className={`bg-white w-full max-w-2xl rounded-t-lg p-6 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ marginBottom: "80px" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-bold">검색</h2>
          <button onClick={handleClose} className="text-gray-500">✖</button>
        </div>

        {/* Tabs */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Sections */}
        {activeTab === "facility" ? <FacilitySection /> : <PensionSection />}

        {/* Footer */}
        <FooterButton handleSearch={handleSearch} />
      </div>
    </div>
  );
};

export default SearchModal;