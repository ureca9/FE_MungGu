import { http, HttpResponse } from 'msw';

export const petHandlers = [
  http.get('/api/hello', () => {
    const responseData = { message: 'Hello, world!' }; // 응답 데이터 정의
    return HttpResponse.json(responseData, { status: 200 });
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
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTz1VEr5uBGBH5ixQ3PsmlVIP9moiXrQY4XA&s',
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

  http.post('/api/p', async (req) => {
    const contentType = req.headers.post('content-type'); // 헤더에서 Content-Type 확인

    if (contentType.includes('multipart/form-data')) {
      // 요청 본문을 읽고 FormData로 변환
      const formData = await req.formData();

      // FormData를 객체로 변환
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      console.log('POST 요청 데이터:', data);

      // JSON 응답 반환
      return HttpResponse.json(
        { message: '반려동물 추가 성공!', receivedData: data },
        { status: 201 },
      );
    }

    // Content-Type이 맞지 않을 경우 에러 응답
    return HttpResponse.json({ error: '잘못된 Content-Type' }, { status: 400 });
  }),
];
