import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTER_PATHS from '../../utils/RouterPath';
import HeaderImg from '../../assets/mungsengneacut/HeaderImg.svg';
import { instance } from '../../api/axios';

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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const yy = String(date.getFullYear()).slice(2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yy}.${mm}.${dd}`;
};

const Mungsengneacut = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [allPhotos, setAllPhotos] = useState([]);
  const [myPhotos, setMyPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const response = await instance.get('/members/detail', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200 && response.data.message === 'success') {
          setNickname(response.data.data.nickname);
        }
      } catch (error) {
        console.error('Error fetching nickname:', error);
      }
    };

    fetchNickname();
  }, []);

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
        <CustomTabPanel value={selectedTab} index={0}>
          {isLoading ? (
            <div className="font-bold">로딩 중..</div>
          ) : (
            <div>
              <div className="mb-2 text-lg ">
                <b className="text-[#3288ff]">멍티비티 회원님</b>들의 멍생네컷
              </div>
              <ul className="grid grid-cols-2 gap-4">
                {allPhotos.map((photo) => (
                  <li key={photo.photoId} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-center">
                        {photo.nickname}님
                      </p>
                      <p className="text-sm text-center text-gray-500">
                        {formatDate(photo.createdAt)}
                      </p>
                    </div>
                    <img
                      src={photo.meongPhotoUrl}
                      alt={photo.nickname}
                      className="w-full h-auto rounded-lg"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CustomTabPanel>
        {selectedTab === 1 && (
          <CustomTabPanel value={selectedTab} index={1}>
            {isLoading ? (
              <div className="font-bold">로딩 중..</div>
            ) : myPhotos.length === 0 ? (
              <p className="text-center">아직 사진이 없어요..</p>
            ) : (
              <div>
                <div className="mb-2 text-lg">
                  <b className="text-[#3288ff]">{nickname}</b>님의 멍생네컷
                </div>
                <ul className="grid grid-cols-2 gap-4">
                  {myPhotos.map((photo) => (
                    <li
                      key={photo.photoId}
                      className="px-4 pt-2 pb-4 border rounded"
                    >
                      <p className="text-sm text-gray-500 text-end">
                        {formatDate(photo.createdAt)}
                      </p>
                      <img
                        src={photo.meongPhotoUrl}
                        alt="My Photo"
                        className="w-full h-auto"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CustomTabPanel>
        )}
      </div>
    </>
  );
};

export default Mungsengneacut;
