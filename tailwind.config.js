/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        backgroundGray: '#F3F4F5', // 페이지 배경색
        borderlineGray: '#E1E2E3', //페이지 안에 블럭 테두리 색상
        inputGray: '#8A8A8A', //이름, 견종 ... input스타일 테두리색/ 지도 페이지 글씨색/반려견 수정 글씨색
        textGray: '#6F6F6F', // 마이페이지 글씨색/
      },
    },
  },
  plugins: [],
};
