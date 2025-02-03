import PensionList from './PensionList';

export default {
  title: 'Common/PensionList',
  component: PensionList,
};

const Template = (args) => <PensionList {...args} />;

export const Default = Template.bind({});
Default.args = {
  count: 6,
};

export const LargeList = Template.bind({});
LargeList.args = {
  count: 10,
};
