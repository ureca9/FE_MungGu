import { http, HttpResponse } from 'msw';

export const petHandlers = [
  http.get('/api/hello', () => {
    const responseData = { message: 'Hello, world!' }; // 응답 데이터 정의
    return HttpResponse.json(responseData, { status: 200 });
  }),

  http.get('/api/pet', () => {
    const pets = [
      {
        puppyId: 1,
        puppyName: '모리',
      },
      {
        puppyId: 2,
        puppyName: '토리',
      },
      {
        puppyId: 3,
        puppyName: '젤리',
      },
    ];
    return HttpResponse.json(pets, { status: 200 });
  }),

  http.get('/api/member', () => {
    const memberData = {
      message: 'success',
      data: {
        memberId: 1,
        nickname: '사용자명',
        profileImageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTz1VEr5uBGBH5ixQ3PsmlVIP9moiXrQY4XA&s',
        puppyList: [
          {
            puppyId: 1,
            puppyName: '모리',
            puppyImageUrl:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTz1VEr5uBGBH5ixQ3PsmlVIP9moiXrQY4XA&s',
          },
          {
            puppyId: 2,
            puppyName: '토리',
          },
          {
            puppyId: 3,
            puppyName: '젤리',
          },
        ],
      },
      timestamp: '2024-10-17 00:00:00',
    };
    return HttpResponse.json(memberData, { status: 200 });
  }),
];
