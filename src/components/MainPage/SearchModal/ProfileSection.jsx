import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ProfileSection = ({ setMaxDogWeight, onComplete }) => {
  const [dogList, setDogList] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [selectedDogInfo, setSelectedDogInfo] = useState(null); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

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
      <div className="flex overflow-x-auto space-x-4 mb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {dogList.map((dog) => (
          <div
            key={dog.id}
            onClick={() => handleDogSelect(dog.id)}
            className="relative flex flex-col items-center cursor-pointer"
          >
            {dog.imageUrl ? (
              <img
                src={dog.imageUrl}
                alt={dog.name}
                className={`w-16 h-16 rounded-full object-cover border-2 ${
                  dog.selected ? "border-blue-500" : "border-gray-300"
                }`}
              />
            ) : (
              <div
                className={`w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full border-2 ${
                  dog.selected ? "border-blue-500" : "border-gray-300"
                }`}
              >
                🐾
              </div>
            )}
            <p className="text-sm font-medium text-gray-700 mt-1">{dog.name}</p>
            {dog.selected && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                ✓
              </div>
            )}
          </div>
        ))}
        <div
          onClick={handleAddDogClick}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full border-2 border-gray-300">
            +
          </div>
          <p className="text-sm font-medium text-gray-500 mt-1">추가</p>
        </div>
      </div>


      {selectedDogInfo && (
        <div className="mt-4 p-4 bg-blue-100 rounded-md">
          <p className="text-blue-700 font-medium">
            {selectedDogInfo.name} 기준으로 찾아드려요!
          </p>
        </div>
      )}


      <div className="mt-6">
        <button
          onClick={() => {
            setMaxDogWeight(0); 
            onComplete(); 
          }}
          className="w-full bg-white border border-[#3288FF] text-[#3288FF] py-2 rounded-lg text-lg font-bold hover:bg-[#f0f8ff] transition-colors duration-200"
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
