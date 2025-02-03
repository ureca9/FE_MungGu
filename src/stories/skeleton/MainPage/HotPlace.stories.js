import HotPlace from './HotPlace';

export default {
  title: 'Common/HotPlace',
  component: HotPlace,
};

const Template = (args) => <HotPlace {...args} />;

export const Default = Template.bind({});
Default.args = {
  count: 3,
};

export const LargeList = Template.bind({});
LargeList.args = {
  count: 5,
};
