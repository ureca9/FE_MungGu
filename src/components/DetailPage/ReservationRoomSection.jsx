import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import LoadingSpinner from "../common/LoadingSpinner";

const ReservationRoomSection = ({ pensionId }) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [startDate, setStartDate] = useState(formatDate(today));
  const [endDate, setEndDate] = useState(formatDate(tomorrow));
  const [peopleCount, setPeopleCount] = useState(1);
  const [dogCount, setDogCount] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false); // 초기 로딩 제거
  const [error, setError] = useState(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      const headers = {
        Accept: "application/json",
        ...(accessToken && { Authorization: `${accessToken}` }),
      };

      const response = await axios.get(
        `https://meong9.store/api/v1/${pensionId}/rooms`,
        { headers, params: { startDate, endDate } }
      );

      if (response.data && response.data.data) {
        const parsedRooms = response.data.data.map((item) => ({
          ...item.room,
          images: item.images,
        }));
        setRooms(parsedRooms);
      }
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setError("방 정보를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 날짜 변경 시 유효성 검사
  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      const nextDay = new Date(start);
      nextDay.setDate(start.getDate() + 1);
      setEndDate(formatDate(nextDay));
    }
  }, [startDate, endDate]);

  // 데이터 불러오기
  useEffect(() => {
    fetchRooms();
  }, [startDate, endDate, peopleCount, dogCount]);

  return (
    <section className="p-4 bg-white mt-4">
      {/* 제목 */}
      <h3 className="text-lg font-bold mb-4">예약하기</h3>

      {/* 날짜 및 옵션 선택 */}
      <div className="border-b border-gray-200 pb-4 mb-4 flex flex-wrap gap-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border border-gray-300 rounded w-36 text-sm"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border border-gray-300 rounded w-36 text-sm"
        />
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">인원 수:</label>
          <select
            value={peopleCount}
            onChange={(e) => setPeopleCount(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded text-sm"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}명
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">강아지 수:</label>
          <select
            value={dogCount}
            onChange={(e) => setDogCount(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded text-sm"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i}>
                {i}마리
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 로딩 상태 표시 */}
      {loading && (
        <div className="flex justify-center mb-4">
          <LoadingSpinner />
        </div>
      )}

      {/* 방 정보 */}
      <div>
        {rooms.length === 0 && !loading ? (
          <p className="text-sm text-gray-500">조건에 맞는 방이 없습니다.</p>
        ) : (
          rooms.map((room) => (
            <div
              key={room.roomId}
              className="flex border-b border-gray-200 py-6"
            >
              {/* 이미지 */}
              <div className="w-1/3 h-24 sm:h-48 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={room.images[0] || "https://via.placeholder.com/150"}
                  alt={room.roomName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 텍스트 정보 */}
              <div className="w-2/3 flex flex-col justify-between pl-6">
                {/* 상단: 방 이름과 가격 */}
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-bold truncate">
                    {room.roomName}
                  </h4>
                  <div>
                    <span className="text-base sm:text-2xl font-extrabold text-[#3288ff]">
                      {room.price.toLocaleString()}원
                    </span>
                    <span className="text-xs text-gray-400 ml-1 sm:ml-1 sm:inline-block sm:mt-0 mt-1 w-full text-right sm:w-auto">
                      / 1박
                    </span>
                  </div>
                </div>

                {/* 세부 정보 */}
                <div className="text-sm text-gray-600">
                  <p className="mb-1">
                    {room.area ? `${room.area}㎡` : "면적 정보 없음"}
                  </p>
                  <p className="mb-1">
                    입실 {room.startTime || "정보 없음"} · 퇴실{" "}
                    {room.endTime || "정보 없음"}
                  </p>
                  <p>
                    기준 {room.guestCount}명 · 강아지 {room.petCount}마리
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

ReservationRoomSection.propTypes = {
  pensionId: PropTypes.string.isRequired,
};

export default ReservationRoomSection;
