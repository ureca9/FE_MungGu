import { BasicInput } from './BasicInput';

export default {
  title: 'Example/Input',
  component: BasicInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const BasicPrimary = {
  args: {
    label: '이름',
    id: 'name',
    placeholder: '이름을 입력하세요.',
  },
};
