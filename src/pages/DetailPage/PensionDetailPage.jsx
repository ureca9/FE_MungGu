import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PensionDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pensionDetail, setPensionDetail] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    '2024.11.22 (금) - 2024.11.23 (토)',
  );
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPensionDetail = async () => {
      try {
        const response = await axios.get(`/api/pension-detail/${id}`);
        setPensionDetail(response.data.data);
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPensionDetail();
  }, [id]);

  const handleReservation = (roomId) => {
    setSelectedRoom(roomId);
    alert(`예약이 완료되었습니다: ${roomId}`);
  };

  if (loading) return <div className="p-4">로딩 중...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  if (!pensionDetail) {
    return <div className="p-4">잘못된 데이터입니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-gray-600 text-lg">{`<`}</button>
        <h1 className="text-xl font-bold">{pensionDetail.pensionName}</h1>
        <div className="w-6"></div> {/* Spacer for alignment */}
      </header>

      {/* Image Section */}
      <div className="bg-gray-300 h-64 w-full flex items-center justify-center">
        {/* Replace with actual image */}
        <span className="text-gray-500">이미지</span>
      </div>

      {/* Info Section */}
      <section className="p-4 bg-white">
        <h2 className="text-lg font-bold mb-2">{pensionDetail.pensionName}</h2>
        <p className="text-sm text-gray-500">{pensionDetail.address}</p>
        <div className="flex items-center space-x-2 my-2">
          <span className="text-yellow-500">
            ⭐ {pensionDetail.reviewAvg} ({pensionDetail.reviewCount})
          </span>
          <button className="text-gray-500 hover:text-red-500">♥</button>
          <button className="text-gray-500">공유하기</button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {pensionDetail.tags.map((tag) => (
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
        <p className="text-sm text-gray-500">{pensionDetail.description}</p>
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
          {pensionDetail.rooms.map((room) => (
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

      {/* Basic Info Section */}
      <section className="p-4 bg-white mt-4">
        <h3 className="text-lg font-bold mb-2">기본 정보</h3>
        <ul className="text-sm text-gray-500 list-disc pl-5">
          {pensionDetail.basicInfo.map((info, index) => (
            <li key={index}>{info}</li>
          ))}
        </ul>
      </section>

      {/* Policy Section */}
      <section className="p-4 bg-white mt-4">
        <h3 className="text-lg font-bold mb-2">이용 정책</h3>
        <ul className="text-sm text-gray-500 list-disc pl-5">
          {pensionDetail.policy.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Notice Section */}
      <section className="p-4 bg-white mt-4">
        <h3 className="text-lg font-bold mb-2">주의사항</h3>
        <ul className="text-sm text-gray-500 list-disc pl-5">
          {pensionDetail.notice.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
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