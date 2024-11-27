import React from 'react';

const RecommendedPensions = () => {
  // 샘플 데이터 정의
  const pensions = [
    {
      id: '1',
      name: '제주 힐링 펜션',
      location: '제주 서귀포',
      img: 'https://example.com/pension1.jpg',
      reviewAvg: '4.8',
      reviewCount: '120',
    },
    {
      id: '2',
      name: '가평 숲속 펜션',
      location: '경기도 가평',
      img: 'https://example.com/pension2.jpg',
      reviewAvg: '4.5',
      reviewCount: '80',
    },
    {
      id: '3',
      name: '설악산 전망 펜션',
      location: '강원도 속초',
      img: 'https://example.com/pension3.jpg',
      reviewAvg: '4.7',
      reviewCount: '95',
    },
    {
      id: '4',
      name: '남해 바다 펜션',
      location: '경남 남해',
      img: 'https://example.com/pension4.jpg',
      reviewAvg: '4.9',
      reviewCount: '150',
    },
    {
      id: '5',
      name: '전주 한옥 펜션',
      location: '전라북도 전주',
      img: 'https://example.com/pension5.jpg',
      reviewAvg: '4.6',
      reviewCount: '110',
    },
    {
      id: '6',
      name: '부산 오션뷰 펜션',
      location: '부산 해운대',
      img: 'https://example.com/pension6.jpg',
      reviewAvg: '4.8',
      reviewCount: '140',
    },
  ];

  return (
    <section className="p-4">
      <h2 className="text-lg font-bold mb-2">추천 펜션 ✨</h2>
      {/* 가로 스크롤 가능한 컨테이너 */}
      <div className="flex gap-4 overflow-x-auto">
        {pensions.map((pension) => (
          <div
            key={pension.id}
            className="min-w-[200px] p-4 bg-white shadow-md rounded-lg text-center cursor-pointer"
          >
            {/* 이미지 */}
            <div
              className="w-full h-40 bg-gray-300 rounded-lg mb-2"
              style={{
                backgroundImage: `url(${pension.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            {/* 텍스트 정보 */}
            <h3 className="text-sm font-bold">{pension.name}</h3>
            <p className="text-xs text-gray-500">{pension.location}</p>
            <p className="text-sm text-yellow-500 mt-1">
              ⭐ {pension.reviewAvg} ({pension.reviewCount} 리뷰)
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedPensions;