import { http, HttpResponse } from 'msw';

export const placeDetailHandler = [
  http.get('/api/place-detail/:id', (req) => {
    const { id } = req.params; // URL에서 동적 id 값 추출

    const responseData = {
      message: 'success',
      data: {
        pensionInfo: {
          pensionId: id,
          pensionName: '장소명입니다.',
          address: '서울 강남구 강남대로',
          tags: ['주차 가능', '반려견 출입 가능', '물놀이 가능'],
          reviewAvg: 4.5,
          reviewCount: 150,
          startTime: '15:00',
          endTime: '11:00',
          phone: '02-123-4567',
          description: '내부 좌석 제공.',
          policy: '반려견 동반 가능.',
          restrictions: '쓰레기는 반드시 치워주세요.',
          introduction: '여기는 정말 아름답습니다. 반려견과 함께하기 좋은 장소입니다.',
          images: [
            'https://via.placeholder.com/800x300', // 예시 이미지
          ],
        },
        review: [
          {
            reviewId: '1',
            content: '정말 멋진 곳이에요!',
            score: 4.8,
            visitDate: '2024-11-01',
            nickname: '펫러버',
            file: [
              {
                fileId: 1,
                fileType: 'image',
                fileUrl: 'https://via.placeholder.com/100x100',
              },
            ],
          },
        ],
      },
      timestamp: '2024-11-26 16:00:00',
    };

    return HttpResponse.json(responseData, { status: 200 });
  }),
];