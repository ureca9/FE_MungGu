import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTER_PATHS from '../../utils/RouterPath';
import HeaderImg from '../../assets/mungsengneacut/HeaderImg.svg';
import LoadingSpinner from './../../components/common/LoadingSpinner';
import {
  fetchNickname,
  fetchAllPhotos,
  fetchMyPhotos,
  fetchPaginatedPhotos,
} from '../../api/mungsengneacut';

const PAGE_SIZE = 6;

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
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const observerRef = useRef(null);

  useEffect(() => {
    const getNickname = async () => {
      try {
        const name = await fetchNickname();
        setNickname(name);
      } catch (error) {
        console.error(error);
      }
    };

    getNickname();
  }, []);

  const loadInitialPhotos = async () => {
    try {
      setIsLoading(true);
      const photoList =
        selectedTab === 0
          ? await fetchAllPhotos(0, PAGE_SIZE)
          : await fetchMyPhotos(0, PAGE_SIZE);

      if (selectedTab === 0) {
        setAllPhotos(photoList);
      } else {
        setMyPhotos(photoList);
      }
    } catch (error) {
      console.error('사진 불러오기 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMorePhotos = async (currentPage) => {
    try {
      setIsLoading(true);
      const { photos, hasNext } = await fetchPaginatedPhotos(
        currentPage,
        PAGE_SIZE,
        selectedTab === 1,
      );

      if (selectedTab === 0) {
        setAllPhotos((prev) => [...prev, ...photos]);
      } else {
        setMyPhotos((prev) => [...prev, ...photos]);
      }
      setHasNext(hasNext);
    } catch (error) {
      console.error('더 많은 사진 불러오기 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
    setAllPhotos([]);
    setHasNext(true);
    loadInitialPhotos();
  }, [selectedTab]);

  useEffect(() => {
    if (page > 0 && hasNext) {
      loadMorePhotos(page);
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading && hasNext) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [isLoading, hasNext]);

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
          <button
            className={`px-4 py-2 ${
              selectedTab === 0
                ? 'border-b-[3px] border-[#3288FF] font-bold text-[#3288FF]'
                : 'text-gray-500 border-b-[3px] border-b-white'
            }`}
            onClick={() => setSelectedTab(0)}
          >
            전체
          </button>
          <button
            className={`px-4 py-2 ${
              selectedTab === 1
                ? 'border-b-[3px] border-[#3288FF] font-bold text-[#3288FF]'
                : 'text-gray-500 border-b-[3px] border-b-white'
            }`}
            onClick={() => setSelectedTab(1)}
          >
            MY
          </button>
        </div>
        <CustomTabPanel value={selectedTab} index={selectedTab}>
          {selectedTab === 0 ? (
            <div className="mb-2 text-lg">
              <b className="text-[#3288ff]">멍티비티 회원님</b>들의 멍생네컷
            </div>
          ) : (
            <div className="mb-2 text-lg">
              <b className="text-[#3288ff]">{nickname || '회원'}</b>
              님의 멍생네컷
            </div>
          )}
          {selectedTab === 0 ? (
            allPhotos.length > 0 ? (
              <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {allPhotos.map((photo, index) => (
                  <li key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-bold text-center md:text-base">
                        {photo.nickname || '익명'}님
                      </p>
                      <p className="text-xs text-center text-gray-500 md:text-sm">
                        {formatDate(photo.createdAt)}
                      </p>
                    </div>
                    <img
                      src={photo.meongPhotoUrl}
                      alt={`전체 사진 ${index}`}
                      className="w-full h-auto rounded-lg"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              !isLoading && (
                <p className="mt-4 text-center text-gray-500">
                  아직 만들어진 멍생네컷이 없어요!
                </p>
              )
            )
          ) : myPhotos.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
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
          ) : (
            !isLoading && (
              <p className="mt-4 text-center text-gray-500">
                아직 나의 멍생네컷이 없어요!
              </p>
            )
          )}
          {isLoading && <LoadingSpinner />}
          <div ref={observerRef} className="h-10"></div>
        </CustomTabPanel>
      </div>
    </>
  );
};

export default Mungsengneacut;
