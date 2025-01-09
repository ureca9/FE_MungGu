import { fn } from '@storybook/test';

import { CRUDBtn } from './CRUDBtn';

export default {
  title: 'Example/Button',
  component: CRUDBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
};

export const CRUDPrimary = {
  args: {
    primary: true,
    label: 'Button',
    size: 'sm',
  },
};
