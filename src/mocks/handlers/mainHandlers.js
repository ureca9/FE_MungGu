const dummyData = {
  message: 'success',
  data: {
    item: [
      {
        id: "1",
        name: "힐링 펜션",
        address: "인천 송도",
        img: "/images/pension1.jpg",
        reviewAvg: 4.8,
        reviewCount: 25,
        count: 1200,
      },
      {
        id: "2",
        name: "바다 전망 캠핑장",
        address: "강원 고성",
        img: "/images/camping1.jpg",
        reviewAvg: 4.5,
        reviewCount: 10,
        count: 540,
      },
    ],
  },
  timestamp: "2024-10-17 00:00:00",
};

// 핸들러 함수
export const handlers = [
  {
    url: '/api/facilities',
    handler: async () => {
      return new Response(JSON.stringify(dummyData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    },
  },
];