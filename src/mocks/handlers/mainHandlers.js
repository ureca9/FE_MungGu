import { http, HttpResponse } from 'msw';

export const mainHandlers = [
  http.get('/api/hello', () => {
    const responseData = { message: 'Hello, world!' }; // 응답 데이터 정의
    console.log('요청이 정상적으로 들어감');
    return HttpResponse.json(responseData, { status: 200 });
  }),
];
