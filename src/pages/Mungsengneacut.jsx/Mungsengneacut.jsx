import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTER_PATHS from '../../utils/RouterPath';
import HeaderImg from '../../assets/mungsengneacut/HeaderImg.svg';
import { instance } from './../../api/axios';

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
  { label: '전체', content: 'Loading...' },
  { label: 'MY', content: 'Loading...' },
];

const Mungsengneacut = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [allPhotos, setAllPhotos] = useState([]);
  const [myPhotos, setMyPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        if (selectedTab === 0) {
          const response = await instance.get(
            '/photos?lastPhotoId=12&size=10',
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            },
          );
          setAllPhotos(response.data.data.meongPhotoList);
        } else if (selectedTab === 1) {
          const response = await instance.get(
            '/photos/mine?lastPhotoId=12&size=10',
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer {access_token}`,
              },
            },
          );
          setMyPhotos(response.data.data.myMeongPhotoList);
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [selectedTab]);

  const startBtn = () => {
    navigate(ROUTER_PATHS.CHOOSE_FRAME);
  };

  return (
    <>
      <div className="relative">
        <div className="block">
          <img src={HeaderImg} className="max-w-full" />
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
        {selectedTab === 0 && (
          <CustomTabPanel value={selectedTab} index={0}>
            {isLoading ? (
              'Loading...'
            ) : (
              <ul>
                {allPhotos.map((photo) => (
                  <li key={photo.photoId}>
                    <img src={photo.meongPhotoUrl} alt={photo.nickname} />
                    <p>{photo.nickname}</p>
                    <p>{photo.createdAt}</p>
                  </li>
                ))}
              </ul>
            )}
          </CustomTabPanel>
        )}
        {selectedTab === 1 && (
          <CustomTabPanel value={selectedTab} index={1}>
            {isLoading ? (
              'Loading...'
            ) : (
              <ul>
                {myPhotos.map((photo) => (
                  <li key={photo.photoId}>
                    <img src={photo.meongPhotoUrl} alt="My Photo" />
                    <p>{photo.createdAt}</p>
                  </li>
                ))}
              </ul>
            )}
          </CustomTabPanel>
        )}
      </div>
    </>
  );
};

export default Mungsengneacut;
