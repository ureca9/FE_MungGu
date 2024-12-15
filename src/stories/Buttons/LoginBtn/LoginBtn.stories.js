import { fn } from '@storybook/test';

import { LoginBtn } from './LoginBtn';

export default {
  title: 'Example/LoginBtn',
  component: LoginBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
};

export const LoginPrimary = {
  args: {
    styleType: 'kakao',
  },
};
