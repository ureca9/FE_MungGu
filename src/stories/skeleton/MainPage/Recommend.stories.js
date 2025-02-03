import Recommend from './Recommend';

export default {
  title: 'Common/Recommend',
  component: Recommend,
};

const Template = (args) => <Recommend {...args} />;

export const Default = Template.bind({});
Default.args = {
  count: 3,
};

export const LargeList = Template.bind({});
LargeList.args = {
  count: 5,
};
