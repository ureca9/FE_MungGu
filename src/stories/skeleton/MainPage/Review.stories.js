import Review from './Review';

export default {
  title: 'Common/Review',
  component: Review,
};

const Template = (args) => <Review {...args} />;

export const Default = Template.bind({});
Default.args = {
  count: 3,
};

export const LargeList = Template.bind({});
LargeList.args = {
  count: 5,
};
