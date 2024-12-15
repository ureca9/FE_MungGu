import { useEffect, useState } from 'react';
import { FaCamera, FaWeightHanging } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { GiBarbecue, GiCampfire, GiWoodenFence } from 'react-icons/gi';
import { PiShareNetworkThin } from 'react-icons/pi';
import { RxStarFilled } from 'react-icons/rx';
import { TbParkingCircleFilled } from 'react-icons/tb';
import { GetPentionData } from '../../../api/review';
import useTypeStore from '../../../stores/review/useTypeStore';
const PlaceData = () => {
  const { plcPenType, pensionId, placeId } = useTypeStore();
  const [basicPension, setBasicPension] = useState({});
  const placeInfo = [
    { icon: <FaWeightHanging className="text-xl" />, text: '무게 제한 없음' },
    { icon: <GiBarbecue className="text-2xl" />, text: '바베큐' },
    { icon: <GiCampfire className="text-xl" />, text: '불멍' },
    { icon: <GiWoodenFence className="text-xl" />, text: '울타리 있음' },
    {
      icon: <TbParkingCircleFilled className="text-xl" />,
      text: '주차 가능',
    },
  ];
  const type = plcPenType;
  const id = plcPenType === '020' ? pensionId : placeId;

  useEffect(() => {
    const fetchPentionData = async () => {
      console.log('장소 확인용:', type, id);
      try {
        const response = await GetPentionData({ type, id });
        console.log('장소 정보:', response.data);
        setBasicPension(response.data);
      } catch (error) {
        console.error('장소정보 오류:', error);
      }
    };
    // if (pensionId) {
    fetchPentionData();
    // }
  }, []);
  return (
    <div className="bg-[#F3F4F5] h-40 sm:h-full px-2 sm:px-7 pt-2 sm:pt-7 gap-5 flex flex-col">
      <div className="flex items-center h-full p-2 bg-white rounded-lg sm:p-4">
        {basicPension.fileUrl ? (
          <img
            src={basicPension.fileUrl}
            alt="펜션 이미지"
            className="w-24 rounded-lg h-28 sm:h-40 sm:min-w-40"
          />
        ) : (
          <div className="sm:min-w-40 sm:h-40 w-24 h-28 bg-[#D9D9D9] flex rounded-lg items-center justify-center ">
            <div className="text-[#8A8A8A] text-4xl flex">
              <FaCamera />
            </div>
          </div>
        )}
        <div className="flex flex-col w-full h-full pl-5">
          <div className="flex flex-row justify-between">
            <div className="flex mb-1 text-lg font-semibold sm:text-2xl">
              {basicPension.name}
            </div>
            <div className="flex items-center justify-center gap-2 text-xl">
              <div className="text-xl ">
                <FiHeart />
              </div>
              <div className="text-2xl ">
                <PiShareNetworkThin />
              </div>
            </div>
          </div>
          <div className="flex mb-1 text-[#8A8A8A]">{basicPension.address}</div>
          <div className="flex ">
            <span className="text-[#FDBD00] text-xl">
              <RxStarFilled />
            </span>
            <span className="ml-2 font-semibold">{basicPension.reviewAvg}</span>
            <span className="ml-1 text-[#8A8A8A]">
              {'('}
              {basicPension.reviewCount}
              {')'}
            </span>
          </div>
          <div className="flex mt-6 sm:justify-around">
            <div className="flex h-full gap-2 ">
              {placeInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex ml-1 gap-1 text-[#8A8A8A] items-center justify-center"
                >
                  <span className="hidden sm:block sm:text-base">{info.icon}</span>
                  <span className="text-xs sm:text-base">{info.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceData;
