import { http, HttpResponse } from 'msw';

export const pensionDetailHandler = [
  http.get('/api/pension-detail/:id', (req) => {
    const { id } = req.params;

    const responseData = {
      message: 'success',
      data: {
        id: id,
        pensionName: '장소명입니다.',
        address: '전북 정읍시 첨단동',
        tags: ['주차 가능', '실내 가능', '배변패드', '울타리 있음'],
        reviewAvg: 4.8,
        reviewCount: 1254,
        description:
          '이곳은 정말 아름답습니다. 주변 산책로와 놀이터가 잘 구비되어 있어 반려견과 함께하기 좋습니다.',
        rooms: [
          {
            id: 101,
            name: '101호',
            size: '40㎡ (12평)',
            checkIn: '입실 15:00',
            checkOut: '퇴실 11:00',
            price: '250,000원',
            features: '기본 정원 2명, 최대 4명',
          },
          {
            id: 102,
            name: '102호',
            size: '40㎡ (12평)',
            checkIn: '입실 15:00',
            checkOut: '퇴실 11:00',
            price: '250,000원',
            features: '기본 정원 2명, 최대 4명',
          },
          {
            id: 103,
            name: '103호',
            size: '40㎡ (12평)',
            checkIn: '입실 15:00',
            checkOut: '퇴실 11:00',
            price: '250,000원',
            features: '기본 정원 2명, 최대 4명',
          },
        ],
        basicInfo: [
          '반려견 동반 가능.',
          '내부 취사 가능.',
          '주차 가능.',
        ],
        policy: [
          '반려견 동반 시 목줄 착용 필수.',
          '예약 후 취소는 규정에 따릅니다.',
        ],
        notice: [
          '시설 사용 후 쓰레기를 치워주세요.',
          '반려견이 다른 방문객에게 피해를 주지 않도록 관리해 주세요.',
        ],
      },
      timestamp: '2024-11-26 16:00:00',
    };

    console.log(`Mock API /api/pension-detail/${id} 호출`);
    return HttpResponse.json(responseData, { status: 200 });
  }),
];