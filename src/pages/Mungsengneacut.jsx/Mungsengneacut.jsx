import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTER_PATHS from '../../utils/RouterPath';
import HeaderImg from '../../assets/mungsengneacut/HeaderImg.svg';

const CustomTabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
    >
      {value === index && <div className="p-6">{children}</div>}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

const tabs = [
  { label: '전체', content: 'Item One Content' },
  { label: 'MY', content: 'Item Two Content' },
];

const Mungsengneacut = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();

  const startBtn = () => {
    navigate(ROUTER_PATHS.CHOOSE_FRAME);
  };

  return (
    <>
      <div className="relative">
        <div className="block">
          <img src={HeaderImg} className="max-w-full " />
          <button
            className="bg-[#3288ff] text-white rounded-lg text-xs mt-2 md:mt-0 md:text-sm px-6 py-[5px] block absolute top-[60%] left-[5.5%] translate-y-[-50%]"
            onClick={startBtn}
          >
            시작하기
          </button>
        </div>
      </div>
      <div className="w-full">
        <div className="flex">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 ${
                selectedTab === index
                  ? 'border-b-[3px] border-[#3288FF] font-bold text-[#3288FF]'
                  : 'text-gray-500 border-b-[3px] border-b-white'
              }`}
              onClick={() => setSelectedTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {tabs.map((tab, index) => (
          <CustomTabPanel key={index} value={selectedTab} index={index}>
            {tab.content}
          </CustomTabPanel>
        ))}
      </div>
    </>
  );
};

export default Mungsengneacut;
