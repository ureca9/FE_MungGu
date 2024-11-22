import React from "react";

const ProfileSection = () => {
  return (
    <div className="mt-6">
      <div
        className="flex justify-between items-center cursor-pointer"
      >
        <h3 className="text-lg font-semibold">프로필</h3>
      </div>
      <div className="mt-4">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            🐾
          </div>
          <p className="ml-4">초코</p>
        </div>
        <button className="w-full p-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
          추가
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;