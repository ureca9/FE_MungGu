import Default from './Default';

export default {
  title: 'Common/SkeletonPhotoList',
  component: Default,
};

const Template = (args) => <Default {...args} />;

export const Basic = Template.bind({});
Default.args = {
  count: 6,
};

export const LargeList = Template.bind({});
LargeList.args = {
  count: 12,
};
