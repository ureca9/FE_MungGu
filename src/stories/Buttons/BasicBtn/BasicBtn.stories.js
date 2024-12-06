import { fn } from '@storybook/test';

import { BasicBtn } from './BasicBtn';

export default {
  title: 'Example/Button',
  component: BasicBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
};

export const BasicPrimary = {
  args: {
    primary: true,
    label: 'Button',
    type: 'lg',
  },
};
