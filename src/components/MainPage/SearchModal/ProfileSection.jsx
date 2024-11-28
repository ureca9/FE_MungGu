import React, { useState } from "react";

const ProfileSection = () => {
  // 더미 데이터: 등록된 강아지 리스트
  const dogs = [
    { id: 1, name: "초코", selected: false },
    { id: 2, name: "몽이", selected: false },
    { id: 3, name: "사랑이", selected: false },
    { id: 4, name: "민트", selected: false},
  ];

  const [dogList, setDogList] = useState(dogs);

  // 강아지 선택 핸들러
  const handleDogSelect = (id) => {
    setDogList((prevList) =>
      prevList.map((dog) =>
        dog.id === id ? { ...dog, selected: !dog.selected } : dog
      )
    );
  };

  // 선택된 강아지 리스트
  const selectedDogs = dogList.filter((dog) => dog.selected);

  return (
    <div className="mt-4">
      {/* 강아지 리스트 */}
      <div>
        {dogList.map((dog) => (
          <div
            key={dog.id}
            onClick={() => handleDogSelect(dog.id)}
            className={`flex items-center mb-4 cursor-pointer p-3 rounded-lg ${
              dog.selected
                ? "bg-blue-100 border-blue-500"
                : "bg-gray-100 border-gray-300"
            } border`}
          >
            <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              🐾
            </div>
            <p className="ml-4 text-lg font-semibold">{dog.name}</p>
            {dog.selected && (
              <span className="ml-auto text-blue-500 text-sm font-semibold">
                선택됨
              </span>
            )}
          </div>
        ))}
      </div>

      {/* 선택된 강아지 정보 */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold">선택된 강아지</h4>
        <p className="text-sm text-gray-600">
          {selectedDogs.length > 0
            ? selectedDogs.map((dog) => dog.name).join(", ")
            : "선택된 강아지가 없습니다."}
        </p>
      </div>

      {/* 강아지 추가 버튼 */}
      <button className="w-full p-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 mt-4">
        추가
      </button>
    </div>
  );
};

export default ProfileSection;