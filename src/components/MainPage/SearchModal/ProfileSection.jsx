import React, { useState, useEffect } from "react";
import { instance } from "../../../api/axios";
import Swal from "sweetalert2";

const ProfileSection = ({ setMaxDogWeight }) => {
  const [dogList, setDogList] = useState([]); // 강아지 리스트 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태
  const [selectedDogInfo, setSelectedDogInfo] = useState(null); // 선택된 반려동물 정보

  // 오류 핸들러
  const handleForbiddenError = () => {
    alert("접근 권한이 없습니다.");
  };

  const handleUnauthorizedError = () => {
    Swal.fire({
      title: "로그인 필요",
      text: "로그인이 만료되었습니다. 다시 로그인해주세요.",
      icon: "warning",
      confirmButtonText: "확인",
    }).then(() => {
      localStorage.clear();
      window.location.href = "/login";
    });
  };

  const handleServerError = () => {
    alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  };

  const handleNetworkError = () => {
    alert("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.");
  };

  // API 요청 함수
  const fetchDogs = async () => {
    try {
      setLoading(true);

      const memberId = localStorage.getItem("MEMBER_ID");
      const token = localStorage.getItem("ACCESS_TOKEN");

      if (!memberId || !token) {
        handleNotLoggedIn();
        return;
      }

      const headers = {
        Authorization: `${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      console.log("Request Headers:", headers);

      const response = await instance.get("/search/puppies", { headers });
      const { data } = response.data;

      if (data?.puppyList?.length > 0) {
        setDogList(
          data.puppyList.map((puppy) => ({
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
      console.error("강아지 데이터를 불러오는 중 오류 발생:", err);

      if (err.response) {
        switch (err.response.status) {
          case 403:
            handleForbiddenError();
            break;
          case 401:
            handleUnauthorizedError();
            break;
          default:
            handleServerError();
            break;
        }
      } else {
        handleNetworkError();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNotLoggedIn = () => {
    setError("로그인이 필요합니다.");
    Swal.fire({
      title: "로그인 필요",
      text: "로그인이 필요합니다. 로그인 페이지로 이동합니다.",
      icon: "info",
      confirmButtonText: "확인",
    }).then(() => {
      window.location.href = "/login";
    });
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

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          다시 시도하기
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">등록된 강아지 리스트</h2>
      <div>
        {dogList.length > 0 ? (
          dogList.map((dog) => (
            <div
              key={dog.id}
              onClick={() => handleDogSelect(dog.id)}
              className={`flex items-center mb-4 cursor-pointer p-3 rounded-lg ${
                dog.selected ? "bg-blue-100 border-blue-500" : "bg-gray-100 border-gray-300"
              } border`}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {dog.imageUrl ? (
                  <img
                    src={dog.imageUrl}
                    alt={dog.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span role="img" aria-label="paw">
                    🐾
                  </span>
                )}
              </div>
              <p className="ml-4 text-lg font-semibold">{dog.name}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">등록된 반려동물이 없습니다.</p>
        )}
      </div>
      {selectedDogInfo && (
        <div className="mt-4 text-center text-gray-700">
          <p>
            <strong>{selectedDogInfo.name}</strong> (무게:{" "}
            {selectedDogInfo.weight}kg) 기준으로 찾아드려요!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
