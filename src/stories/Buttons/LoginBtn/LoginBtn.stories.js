import { fn } from '@storybook/test';

import { LoginBtn } from './LoginBtn';

export default {
  title: 'Example/Button',
  component: LoginBtn,
  parameters: {
    layout: 'centered', // 컴포넌트 중앙 배치
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(), // 클릭 이벤트 추적용
  },
};

// 기본 버튼 스토리
export const LoginPrimary = {
  args: {
    label: '카카오로 로그인하기', // 버튼 텍스트
    styleType: 'kakao', // 스타일 타입
    iconSrc: '/images/kakao-icon.png', // 아이콘 경로
  },
};

// 구글 버튼 스토리
export const LoginGoogle = {
  args: {
    label: '구글로 로그인하기',
    styleType: 'google',
    iconSrc: '/images/google-icon.png',
  },
};

// 네이버 버튼 스토리
export const LoginNaver = {
  args: {
    label: '네이버로 로그인하기',
    styleType: 'naver',
    iconSrc: '/images/naver-icon.png',
  },
};
