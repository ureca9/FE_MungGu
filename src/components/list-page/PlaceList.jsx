import React from 'react';
import PlaceCard from './PlaceCard';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const PlaceList = ({ results, onCardClick, setResults }) => {
  const navigate = useNavigate(); // navigate 선언 추가

  const toggleLike = async (placeId) => {
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      if (!accessToken) {
        const result = await Swal.fire({
          title: '로그인 후 이용해주세요.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: '로그인',
          cancelButtonText: '취소',
          confirmButtonColor: '#3288FF',
        });

        if (result.isConfirmed) {
          navigate('/login'); // navigate로 로그인 페이지 이동
        }
        return;
      }

      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };

      // 좋아요 상태 토글 API 호출
      await fetch(`https://meong9.store/api/v1/places/likes/${placeId}`, {
        method: 'POST',
        headers,
      });

      // 상태 업데이트
      setResults((prevResults) =>
        prevResults.map((item) =>
          item.placeId === placeId
            ? { ...item, likeStatus: !item.likeStatus }
            : item
        )
      );
    } catch (error) {
      console.error('좋아요 상태 변경 실패:', error);
    }
  };

  if (results.length === 0) {
    return <p className="text-center text-gray-500">조건에 맞는 시설이 없습니다.</p>;
  }

  return (
    <div className="px-6 py-4 space-y-4">
      {results.map((place) => (
        <PlaceCard
          key={place.placeId}
          place={place}
          onCardClick={onCardClick}
          onToggleLike={toggleLike} // `PlaceCard`에 전달
        />
      ))}
    </div>
  );
};

export default PlaceList;
