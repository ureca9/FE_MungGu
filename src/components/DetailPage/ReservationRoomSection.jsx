import React, { useState, useEffect } from "react";
import axios from "axios";

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

      console.log("Response data:", response.data);

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

  useEffect(() => {
    if (startDate && endDate) {
      fetchRooms();
    }
  }, [startDate, endDate]);

  // 시작 날짜 변경 시 끝 날짜를 검증 및 자동 설정
  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 끝 날짜가 시작 날짜보다 이르면 자동으로 시작 날짜의 다음 날로 설정
    if (end <= start) {
      const newEndDate = new Date(start);
      newEndDate.setDate(start.getDate() + 1);
      setEndDate(formatDate(newEndDate));
    }
  }, [startDate]); // 시작 날짜 변경 시만 실행

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section style={{ padding: "16px", backgroundColor: "#fff", marginTop: "16px" }}>
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>
        예약하기
      </h3>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "14px",
            border: "1px solid #e2e8f0",
            borderRadius: "4px",
            flex: 1,
          }}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "14px",
            border: "1px solid #e2e8f0",
            borderRadius: "4px",
            flex: 1,
          }}
        />
        <button
          onClick={fetchRooms}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            backgroundColor: "#3182ce",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          조회
        </button>
      </div>

      {rooms.length === 0 ? (
        <p style={{ fontSize: "14px", color: "#718096" }}>예약 가능한 방이 없습니다.</p>
      ) : (
        rooms.map((room, index) => (
          <div
            key={room.roomId || index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ width: "150px", height: "100px", overflow: "hidden" }}>
              <img
                src={room.images[0] || "https://via.placeholder.com/150"}
                alt={room.roomName}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ flex: 1, padding: "8px 16px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>
                {room.roomName}
              </h4>
              <p style={{ fontSize: "14px", color: "#718096", marginBottom: "4px" }}>
                {room.area ? `${room.area}㎡` : "면적 정보 없음"} · 기준 {room.guestCount}명 · 최대 {room.petCount}견
              </p>
              <p style={{ fontSize: "14px", color: "#4a5568", marginBottom: "4px" }}>
                {room.startTime ? `입실 ${room.startTime}` : "입실 시간 정보 없음"} · {room.endTime ? `퇴실 ${room.endTime}` : "퇴실 시간 정보 없음"}
              </p>
              <p style={{ fontSize: "14px", color: "#2d3748" }}>
                {room.price.toLocaleString()}원 / 1박
              </p>
            </div>

            <div style={{ padding: "8px 16px" }}>
              {room.isSoldOut ? (
                <button
                  style={{
                    padding: "8px 16px",
                    fontSize: "14px",
                    backgroundColor: "#e2e8f0",
                    color: "#a0aec0",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "not-allowed",
                  }}
                  disabled
                >
                  매진
                </button>
              ) : (
                <button
                  style={{
                    padding: "8px 16px",
                    fontSize: "14px",
                    backgroundColor: "#3182ce",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => alert(`"${room.roomName}" 예약하기`)}
                >
                  예약
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default ReservationRoomSection;
