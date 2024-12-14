import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

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
  const [peopleCount, setPeopleCount] = useState(1); // Default people count
  const [dogCount, setDogCount] = useState(0); // Default dog count
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
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
        {
          headers,
          params: { startDate, endDate },
        }
      );

      if (response.data && response.data.data) {
        const parsedRooms = response.data.data
          .map((item) => ({
            ...item.room,
            images: item.images,
          }))
          .filter(
            (room) =>
              room.guestCount >= peopleCount && room.petCount >= dogCount
          ); // Filter rooms based on people and dog count
        setRooms(parsedRooms);
      }
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setError("방 정보를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchRooms();
    }
  }, [startDate, endDate, peopleCount, dogCount]);

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    const maxBookingDate = new Date();
    maxBookingDate.setMonth(maxBookingDate.getMonth() + 3);

    if (end <= start) {
      const newEndDate = new Date(start);
      newEndDate.setDate(start.getDate() + 1);
      setEndDate(formatDate(newEndDate));
    }

    if (start < today) {
      setStartDate(formatDate(today));
      return;
    }

    if (start > maxBookingDate) {
      setStartDate(formatDate(maxBookingDate));
      return;
    }
  }, [startDate]);

  ReservationRoomSection.propTypes = {
    pensionId: PropTypes.string.isRequired,
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="p-4 bg-white mt-4">
      <h3 className="text-lg font-bold mb-4">방 정보 보기</h3>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 text-sm border border-gray-300 rounded w-36"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 text-sm border border-gray-300 rounded w-36"
        />
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">사람 수:</label>
          <select
            value={peopleCount}
            onChange={(e) => setPeopleCount(Number(e.target.value))}
            className="p-2 text-sm border border-gray-300 rounded"
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
            className="p-2 text-sm border border-gray-300 rounded"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i}>
                {i}견
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={fetchRooms}
          className="p-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          조회
        </button>
      </div>

      {rooms.length === 0 ? (
        <p className="text-sm text-gray-500">조건에 맞는 방이 없습니다.</p>
      ) : (
        rooms.map((room, index) => (
          <div
            key={room.roomId || index}
            className="flex items-center mb-4 border border-gray-300 rounded shadow overflow-hidden"
          >
            <div className="w-36 h-24 overflow-hidden">
              <img
                src={room.images[0] || "https://via.placeholder.com/150"}
                alt={room.roomName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 p-4">
              <h4 className="text-base font-bold mb-2">{room.roomName}</h4>
              <p className="text-sm text-gray-500 mb-1">
                {room.area ? `${room.area}㎡` : "면적 정보 없음"} · 기준 {room.guestCount}명 · 최대 {room.petCount}견
              </p>
              <p className="text-sm text-gray-500 mb-1">
                {room.startTime ? `입실 ${room.startTime}` : "입실 시간 정보 없음"} · {room.endTime ? `퇴실 ${room.endTime}` : "퇴실 시간 정보 없음"}
              </p>
              <p className="text-sm text-gray-800 font-semibold">
                {room.price.toLocaleString()}원 / 1박
              </p>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default ReservationRoomSection;