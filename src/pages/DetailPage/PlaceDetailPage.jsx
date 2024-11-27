import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceDetailPage = () => {
  const { id } = useParams(); // URL의 ID
  const navigate = useNavigate();
  const [placeDetail, setPlaceDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaceDetail = async () => {
      try {
        const response = await axios.get(`/api/place-detail/${id}`);
        setPlaceDetail(response.data.data);
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceDetail();
  }, [id]);

  // 로딩 중일 때
  if (loading) return <div className="p-4">로딩 중...</div>;

  // 에러 발생 시
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  // placeDetail이 정상적으로 로드되지 않은 경우 처리
  if (!placeDetail) {
    return <div className="p-4">잘못된 데이터입니다.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4 text-gray-600 text-lg">
          {'<'}
        </button>
        <h1 className="text-xl font-bold">{placeDetail.pensionInfo.pensionName}</h1>
      </header>

      {/* Image Section */}
      <div className="bg-gray-300 h-48 w-full flex items-center justify-center">
        <img
          src={placeDetail.pensionInfo.images[0] || 'https://via.placeholder.com/800x300'} // 예시 이미지
          alt="Place"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Place Info */}
      <section className="bg-white p-4">
        <h2 className="text-lg font-bold mb-2">{placeDetail.pensionInfo.pensionName}</h2>
        <p className="text-gray-600 text-sm mb-2">{placeDetail.pensionInfo.address}</p>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-yellow-500 text-sm">
            ⭐ {placeDetail.pensionInfo.reviewAvg} ({placeDetail.pensionInfo.reviewCount})
          </span>
          <button className="text-gray-600 text-sm border px-2 py-1 rounded-lg">즐겨찾기</button>
          <button className="text-gray-600 text-sm border px-2 py-1 rounded-lg">공유하기</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {placeDetail.pensionInfo.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-200 text-sm rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white mt-4 p-4">
        <h3 className="text-lg font-bold mb-2">소개글</h3>
        <p className="text-gray-600 text-sm">{placeDetail.pensionInfo.introduction}</p>
      </section>

      {/* Reviews */}
      <section className="bg-white mt-4 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">리얼 리뷰</h3>
          <button className="text-blue-500 text-sm">전체 보기 {'>'}</button>
        </div>
        <div className="flex gap-4 overflow-x-auto">
          {placeDetail.review.map((review) => (
            <div key={review.reviewId} className="w-24 h-24 bg-gray-300 rounded-lg">
              <img src={review.file[0].fileUrl} alt="Review" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Basic Info */}
      <section className="bg-white mt-4 p-4">
        <h3 className="text-lg font-bold mb-2">기본 정보</h3>
        <ul className="text-gray-600 text-sm list-disc pl-5">
          <li>{placeDetail.pensionInfo.description}</li>
          <li>입실 시간: {placeDetail.pensionInfo.startTime}</li>
          <li>퇴실 시간: {placeDetail.pensionInfo.endTime}</li>
        </ul>
      </section>

      {/* Usage Policy */}
      <section className="bg-white mt-4 p-4">
        <h3 className="text-lg font-bold mb-2">이용 정책</h3>
        <p className="text-gray-600 text-sm">{placeDetail.pensionInfo.policy}</p>
      </section>

      {/* Warnings */}
      <section className="bg-white mt-4 p-4">
        <h3 className="text-lg font-bold mb-2">주의 사항</h3>
        <p className="text-gray-600 text-sm">{placeDetail.pensionInfo.restrictions}</p>
      </section>

      {/* Bottom Navigation */}
      <footer className="bg-white fixed bottom-0 left-0 right-0 flex justify-around items-center h-14 border-t">
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

export default PlaceDetailPage;
