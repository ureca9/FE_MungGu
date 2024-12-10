import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [placeDetail, setPlaceDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlaceDetail = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      const headers = {
        Accept: 'application/json',
      };

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      const response = await axios.get(
        `https://meong9.store/api/v1/places/detail/${id}`,
        { headers },
      );

      const data = response.data.data || {};
      setPlaceDetail({
        placeName: data.placeName || '정보 없음',
        address: data.address || '정보 없음',
        reviewCount: data.reviewCount || 0,
        reviewAvg: data.reviewAvg || 0,
        tags: data.tags || [],
        businessHour: data.businessHour || '정보 없음',
        telNo: data.telNo || '정보 없음',
        hmpgUrl: data.hmpgUrl || null,
        description: data.description || '정보 없음',
        images: data.images || [],
        photoReviewList: data.photoReviewList || [],
        review: data.review || [], // Add this line to include the review data
      });
    } catch (error) {
      if (error.response?.status === 404) {
        const errorMessage =
          error.response.data?.message || '데이터를 찾을 수 없습니다.';
        setError(errorMessage);
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

  if (loading) return <div className="p-4">로딩 중...</div>;

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg"
        >
          이전 페이지로 돌아가기
        </button>
      </div>
    );
  }

  if (!placeDetail) {
    return <div className="p-4">잘못된 데이터입니다.</div>;
  }

  const {
    placeName,
    address,
    reviewCount,
    reviewAvg,
    tags = [],
    businessHour,
    telNo,
    hmpgUrl,
    description,
    images = [],
    photoReviewList = [],
    review = [],
  } = placeDetail;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center p-4 bg-white shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-lg text-gray-600"
        >
          {'<'}
        </button>
        <h1 className="text-xl font-bold">{placeName}</h1>
      </header>

      {/* Image Section */}
      <div className="flex items-center justify-center w-full h-48 bg-gray-300">
        <img
          src={images[0] || 'https://via.placeholder.com/800x300'}
          alt={placeName}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Place Info */}
      <section className="p-4 bg-white">
        <h2 className="mb-2 text-lg font-bold">{placeName}</h2>
        <p className="mb-2 text-sm text-gray-600">{address}</p>
        <div className="flex items-center mb-4 space-x-2">
          <span className="text-sm text-yellow-500">
            ⭐ {reviewAvg} ({reviewCount} 리뷰)
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-gray-200 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Business Info */}
      <section className="p-4 mt-4 bg-white">
        <h3 className="mb-2 text-lg font-bold">운영 정보</h3>
        <p>운영 시간: {businessHour || '정보 없음'}</p>
        <p>전화 번호: {telNo || '정보 없음'}</p>
        {hmpgUrl && (
          <p>
            홈페이지:{' '}
            <a href={hmpgUrl} target="_blank" rel="noopener noreferrer">
              {hmpgUrl}
            </a>
          </p>
        )}
      </section>

      {/* Description */}
      <section className="p-4 mt-4 bg-white">
        <h3 className="mb-2 text-lg font-bold">시설 정보</h3>
        <p className="text-sm text-gray-600">{description || '설명 없음'}</p>
      </section>

      {photoReviewList.length > 0 && (
        <section
          style={{
            padding: '16px',
            backgroundColor: '#fff',
            marginTop: '16px',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>
              리얼 포토 리뷰
            </h3>
            <button
              style={{
                fontSize: '14px',
                color: '#3182ce',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
              }}
              onClick={() => alert('전체보기 기능 연결 예정입니다!')}
            >
              전체보기 >
            </button>
          </div>

          <div
            style={{
              display: 'inline-flex',
              gap: '16px',
            }}
          >
            {photoReviewList.map((photoReview) => {
              // 리뷰 데이터에서 해당 reviewId를 기반으로 추가 정보를 찾음
              const matchingReview = review.find(
                (r) => String(r.reviewId) === String(photoReview.reviewId), // String으로 변환하여 비교
              );

              return (
                <div
                  key={photoReview.reviewId}
                  style={{
                    flex: '0 0 auto',
                    width: '150px',
                    borderRadius: '8px',
                    backgroundColor: '#f9fafb',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    padding: '8px',
                    textAlign: 'center', // 텍스트 가운데 정렬
                  }}
                >
                  <img
                    src={
                      photoReview.representativeImageUrl ||
                      'https://via.placeholder.com/150'
                    }
                    alt="포토 리뷰"
                    style={{
                      width: '100%',
                      height: '100px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      marginBottom: '8px',
                    }}
                  />
                  {/* 작성자 닉네임 */}
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      marginBottom: '4px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {matchingReview?.nickname || '작성자 없음'}
                  </p>
                  {/* 리뷰 내용 */}
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#718096',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {matchingReview?.content || '리뷰 내용 없음'}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default PlaceDetailPage;
