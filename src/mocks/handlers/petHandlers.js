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
];
