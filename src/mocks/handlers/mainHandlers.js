import { http, HttpResponse } from 'msw';

export const mainHandlers = [
  http.get('/api/hot-places', () => {
    const responseData = {
      message: 'success',
      data: [
        {
          id: '1',
          name: '송도 카페',
          address: '인천 송도',
          category: '카페',
          img: 'https://example.com/cafe1.jpg',
          reviewAvg: '4.5',
          reviewCount: '50',
        },
        {
          id: '2',
          name: '제주 펜션',
          address: '제주 서귀포',
          category: '펜션',
          img: 'https://example.com/pension1.jpg',
          reviewAvg: '4.8',
          reviewCount: '100',
        },
        {
          id: '3',
          name: '서울 공원',
          address: '서울 종로',
          category: '공원',
          img: 'https://example.com/park1.jpg',
          reviewAvg: '4.2',
          reviewCount: '30',
        },
        {
          id: '4',
          name: '부산 놀이터',
          address: '부산 해운대',
          category: '놀이터',
          img: 'https://example.com/playground1.jpg',
          reviewAvg: '4.7',
          reviewCount: '25',
        },
        {
          id: '5',
          name: '한라산 트레킹 코스',
          address: '제주 한라산',
          category: '산',
          img: 'https://example.com/mountain1.jpg',
          reviewAvg: '4.9',
          reviewCount: '150',
        },
      ],
    };

    console.log('Mock API /api/hot-places 호출');
    return HttpResponse.json(responseData, { status: 200 });
  }),
];