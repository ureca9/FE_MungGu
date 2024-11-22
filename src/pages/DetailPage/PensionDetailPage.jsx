import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PensionDetailPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(
    '2024.11.22 (금) - 2024.11.23 (토)',
  );
  const [selectedRoom, setSelectedRoom] = useState(null);

  // 더미 데이터
  const rooms = [
    {
      id: 101,
      name: "101호",
      size: "40㎡ (12평)",
      checkIn: "입실 15:00",
      checkOut: "퇴실 11:00",
      price: "250,000원",
      features: "기본 정원 2명, 최대 4명",
    },
    {
      id: 102,
      name: "102호",
      size: "40㎡ (12평)",
      checkIn: "입실 15:00",
      checkOut: "퇴실 11:00",
      price: "250,000원",
      features: "기본 정원 2명, 최대 4명",
    },
    {
      id: 103,
      name: "103호",
      size: "40㎡ (12평)",
      checkIn: "입실 15:00",
      checkOut: "퇴실 11:00",
      price: "250,000원",
      features: "기본 정원 2명, 최대 4명",
    },
  ];

  const handleReservation = (roomId) => {
    setSelectedRoom(roomId);
    alert(`예약이 완료되었습니다: ${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-gray-600 text-lg">{`<`}</button>
        <h1 className="text-xl font-bold">장소명</h1>
        <div className="w-6"></div> {/* Spacer for alignment */}
      </header>

      {/* Image Section */}
      <div className="bg-gray-300 h-64 w-full flex items-center justify-center">
        {/* Replace with actual image */}
        <span className="text-gray-500">이미지</span>
      </div>

      {/* Info Section */}
      <section className="p-4 bg-white">
        <h2 className="text-lg font-bold mb-2">장소명입니다.</h2>
        <p className="text-sm text-gray-500">전북 정읍시 첨단동</p>
        <div className="flex items-center space-x-2 my-2">
          <span className="text-yellow-500">⭐ 4.8 (1,254)</span>
          <button className="text-gray-500 hover:text-red-500">♥</button>
          <button className="text-gray-500">공유하기</button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {["주차 가능", "실내 가능", "배변패드", "울타리 있음"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-200 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Description Section */}
      <section className="p-4 bg-white mt-4">
        <h3 className="text-lg font-bold mb-2">소개글</h3>
        <p className="text-sm text-gray-500">
          이곳은 정말 아름답습니다. 주변 산책로와 놀이터가 잘 구비되어 있어 반려견과 함께하기 좋습니다.
        </p>
      </section>

      {/* Reviews Section */}
      <section className="p-4 bg-white mt-4">
        <h3 className="text-lg font-bold mb-2">리얼 포토 리뷰</h3>
        <div className="flex gap-2 overflow-x-auto">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div
              key={index}
              className="w-24 h-24 bg-gray-300 rounded-lg flex-shrink-0"
            ></div>
          ))}
        </div>
      </section>

      {/* Reservation Section */}
      <section className="p-4 bg-white mt-4">
        <h3 className="text-lg font-bold mb-2">예약하기</h3>
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="space-y-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center"
            >
              <div>
                <h4 className="text-lg font-bold mb-1">{room.name}</h4>
                <p className="text-sm text-gray-500">{room.size}</p>
                <p className="text-sm text-gray-500">
                  {room.checkIn} ~ {room.checkOut}
                </p>
                <p className="text-sm text-gray-500">{room.features}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-500 mb-2">
                  {room.price} / 1박
                </p>
                <button
                  onClick={() => handleReservation(room.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  예약
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="p-4 bg-white mt-4">
        <h3 className="text-lg font-bold mb-2">기본 정보</h3>
        <p className="text-sm text-gray-500">- 반려견 동반 가능.</p>
        <p className="text-sm text-gray-500">- 내부 취사 가능.</p>
        <p className="text-sm text-gray-500">- 주차 가능.</p>
      </section>

      {/* Notice Section */}
      <section className="p-4 bg-white mt-4">
        <h3 className="text-lg font-bold mb-2">주의사항</h3>
        <p className="text-sm text-gray-500">
          시설을 사용한 후 쓰레기를 치워주세요. 반려견이 다른 방문객에게 피해를 주지 않도록 관리해 주세요.
        </p>
      </section>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-14 bg-white border-t">
        <button className="text-center text-sm">
          <div className="text-lg">🏠</div>
          홈
        </button>
        <button className="text-center text-sm">
          <div className="text-lg">📍</div>
          지도
        </button>
        <button className="text-center text-sm">
          <div className="text-lg">🐾</div>
          즐겨찾기
        </button>
        <button className="text-center text-sm">
          <div className="text-lg">⚙️</div>
          설정
        </button>
      </footer>
    </div>
  );
};

export default PensionDetailPage;