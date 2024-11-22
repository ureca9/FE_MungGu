import React from "react";

const FooterButton = ({ handleSearch }) => (
  <div className="mt-6">
    <button className="w-full bg-blue-500 text-white p-3 rounded-lg" onClick={handleSearch}>
      검색하기
    </button>
  </div>
);

export default FooterButton;