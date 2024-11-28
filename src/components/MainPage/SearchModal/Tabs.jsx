import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="flex mt-4 border-b">
    <button
      className={`flex-1 p-2 text-center ${
        activeTab === "facility" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
      }`}
      onClick={() => setActiveTab("facility")}
    >
      시설
    </button>
    <button
      className={`flex-1 p-2 text-center ${
        activeTab === "pension" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
      }`}
      onClick={() => setActiveTab("pension")}
    >
      펜션
    </button>
  </div>
);

export default Tabs;