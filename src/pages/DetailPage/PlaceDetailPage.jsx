import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceDetailPage = () => {
  const { id } = useParams(); // URL의 ID
  const navigate = useNavigate();
  const [placeDetail, setPlaceDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Refresh token logic
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token'); // Refresh Token 가져오기
      if (!refreshToken) throw new Error('Refresh token이 없습니다.');

      const response = await axios.post('https://meong9.store/api/v1/auth/refresh', {
        refresh_token: refreshToken,
      });
      const newAccessToken = response.data.access_token;
      localStorage.setItem('ACCESS_TOKEN', newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
      throw error;
    }
  };

  // Fetch Place Detail
  const fetchPlaceDetail = async () => {
    try {
      let accessToken = localStorage.getItem('ACCESS_TOKEN'); // Access Token 가져오기
      if (!accessToken) {
        setError('로그인이 필요합니다.');
        navigate('/login'); // 로그인 페이지로 이동
        return;
      }

      const response = await axios.get(`https://meong9.store/api/v1/places/detail/${id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `${accessToken}`, // Bearer 토큰 추가
        },
      });
      setPlaceDetail(response.data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          // 토큰 갱신 및 재요청
          const newAccessToken = await refreshAccessToken();
          const retryResponse = await axios.get(`https://meong9.store/api/v1/places/detail/${id}`, {
            headers: {
              Accept: 'application/json',
              Authorization: `${newAccessToken}`,
            },
          });
          setPlaceDetail(retryResponse.data.data);
        } catch (refreshError) {
          setError('로그인이 필요합니다.');
          navigate('/login'); // 갱신 실패 시 로그인 페이지로 이동
        }
      } else {
        console.error('API 요청 에러:', error);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  const { placeName, address, reviewCount, reviewAvg, tags, businessHour, telNo, hmpgUrl, description, images, photoReviewList, review } = placeDetail;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4 text-gray-600 text-lg">
          {'<'}
        </button>
        <h1 className="text-xl font-bold">{placeName}</h1>
      </header>

      {/* Image Section */}
      <div className="bg-gray-300 h-48 w-full flex items-center justify-center">
        <img
          src={images?.[0] || 'https://via.placeholder.com/800x300'} // 예시 이미지
          alt="Place"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Place Info */}
      <section className="bg-white p-4">
        <h2 className="text-lg font-bold mb-2">{placeName}</h2>
        <p className="text-gray-600 text-sm mb-2">{address}</p>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-yellow-500 text-sm">
            ⭐ {reviewAvg} ({reviewCount})
          </span>
          <button className="text-gray-600 text-sm border px-2 py-1 rounded-lg">즐겨찾기</button>
          <button className="text-gray-600 text-sm border px-2 py-1 rounded-lg">공유하기</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-200 text-sm rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Business Info */}
      <section className="bg-white mt-4 p-4">
        <h3 className="text-lg font-bold mb-2">운영 정보</h3>
        <p>운영 시간: {businessHour}</p>
        <p>전화 번호: {telNo}</p>
        {hmpgUrl && (
          <p>
            홈페이지: <a href={hmpgUrl} target="_blank" rel="noopener noreferrer">{hmpgUrl}</a>
          </p>
        )}
      </section>

      {/* Description */}
      <section className="bg-white mt-4 p-4">
        <h3 className="text-lg font-bold mb-2">시설 정보</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </section>

      {/* Photo Reviews */}
      <section className="bg-white mt-4 p-4">
        <h3 className="text-lg font-bold mb-2">포토 리뷰</h3>
        <div className="flex gap-4 overflow-x-auto">
          {photoReviewList.map((photoReview) => (
            <div key={photoReview.reviewId} className="w-24 h-24 bg-gray-300 rounded-lg">
              <img src={photoReview.representativeImageUrl} alt="포토 리뷰" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white mt-4 p-4">
        <h3 className="text-lg font-bold mb-2">전체 리뷰</h3>
        <ul>
          {review.map((r) => (
            <li key={r.reviewId} className="mb-4">
              <div className="flex items-center mb-2">
                <img
                  src={r.profileImageUrl || 'https://via.placeholder.com/40'}
                  alt="프로필"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="text-sm font-bold">{r.nickname}</span>
              </div>
              <p className="text-gray-600 text-sm">{r.content}</p>
              <span className="text-gray-400 text-xs">{r.visitDate}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PlaceDetailPage;
