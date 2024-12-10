import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ProfileSection = ({ setMaxDogWeight }) => {
  const [dogList, setDogList] = useState([]); // 강아지 리스트 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [selectedDogInfo, setSelectedDogInfo] = useState(null); // 선택된 반려동물 정보
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [selectedDogsCount, setSelectedDogsCount] = useState(0); // 선택된 강아지 수
  const [humanCount, setHumanCount] = useState(0); // 인원 수

  const fetchDogs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("ACCESS_TOKEN");

      if (!token) {
        console.warn("토큰이 없습니다. 비어있는 리스트를 보여줍니다.");
        setDogList([]);
        setIsLoggedIn(false);
        return;
      }

      setIsLoggedIn(true);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      const response = await axios.get(
        "https://meong9.store/api/v1/search/puppies",
        { headers }
      );
      const { puppyList } = response.data.data;

      if (puppyList && puppyList.length > 0) {
        setDogList(
          puppyList.map((puppy) => ({
            id: puppy.puppyId,
            name: puppy.puppyName,
            weight: puppy.puppyWeight,
            imageUrl: puppy.puppyImageUrl,
            selected: false,
          }))
        );
      } else {
        setDogList([]);
      }
    } catch (err) {
      console.error("강아지 목록을 불러오는 데 실패했습니다.", err);
      setDogList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDogSelect = (id) => {
    setDogList((prevList) => {
      const updatedList = prevList.map((dog) =>
        dog.id === id ? { ...dog, selected: !dog.selected } : dog
      );

      const selectedDogs = updatedList.filter((dog) => dog.selected);
      setSelectedDogsCount(selectedDogs.length);

      if (selectedDogs.length > 0) {
        const maxWeightDog = selectedDogs.reduce(
          (maxDog, dog) => (dog.weight > maxDog.weight ? dog : maxDog),
          { weight: 0 }
        );
        setSelectedDogInfo(maxWeightDog);
        setMaxDogWeight(maxWeightDog.weight);
      } else {
        setSelectedDogInfo(null);
        setMaxDogWeight(0);
      }

      return updatedList;
    });
  };

  const handleAddDogClick = () => {
    if (isLoggedIn) {
      window.location.href = "/pet-add";
    } else {
      Swal.fire({
        title: "로그인 필요",
        text: "강아지를 추가하려면 로그인해주세요.",
        icon: "info",
        confirmButtonText: "확인",
      }).then(() => {
        window.location.href = "/login";
      });
    }
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">누구랑 함께 가나요?</h2>
      <div className="flex items-center space-x-4 mb-4">
        {dogList.map((dog) => (
          <div
            key={dog.id}
            onClick={() => handleDogSelect(dog.id)}
            className={`relative w-16 h-16 rounded-full overflow-hidden cursor-pointer ${
              dog.selected ? "border-2 border-blue-500" : "border-2 border-gray-300"
            }`}
          >
            {dog.imageUrl ? (
              <img
                src={dog.imageUrl}
                alt={dog.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                🐾
              </div>
            )}
            {dog.selected && (
              <div className="absolute inset-0 flex items-center justify-center bg-blue-500 bg-opacity-50">
                <span className="text-white text-lg font-bold">✓</span>
              </div>
            )}
          </div>
        ))}
        <button
          onClick={handleAddDogClick}
          className="w-16 h-16 flex items-center justify-center border-2 border-gray-300 rounded-full text-gray-500 text-lg"
        >
          +
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-600">총 강아지 수</p>
          <div className="flex items-center">
            <button
              onClick={() =>
                setSelectedDogsCount((count) => Math.max(count - 1, 0))
              }
              className="px-2 py-1 bg-gray-200 rounded-l-lg"
            >
              -
            </button>
            <span className="px-4 py-1 border">{selectedDogsCount}</span>
            <button
              onClick={() => setSelectedDogsCount((count) => count + 1)}
              className="px-2 py-1 bg-gray-200 rounded-r-lg"
            >
              +
            </button>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600">인원</p>
          <div className="flex items-center">
            <button
              onClick={() => setHumanCount((count) => Math.max(count - 1, 0))}
              className="px-2 py-1 bg-gray-200 rounded-l-lg"
            >
              -
            </button>
            <span className="px-4 py-1 border">{humanCount}</span>
            <button
              onClick={() => setHumanCount((count) => count + 1)}
              className="px-2 py-1 bg-gray-200 rounded-r-lg"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* 가장 무거운 강아지 메시지 */}
      {selectedDogInfo && (
        <div className="mt-4 p-4 bg-blue-100 rounded-md">
          <p className="text-blue-700 font-medium">
            {selectedDogInfo.name} 기준으로 찾아드려요!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
