import { useEffect, useState } from 'react';
import { FaCamera, FaWeightHanging } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { GiBarbecue, GiCampfire, GiWoodenFence } from 'react-icons/gi';
import { PiShareNetworkThin } from 'react-icons/pi';
import { RxStarFilled } from 'react-icons/rx';
import { TbParkingCircleFilled } from 'react-icons/tb';
import { GetPentionData } from '../../../api/review';
const PlaceData = () => {
  const [pensionId] = useState();
  const [basicPension, setBasicPension] = useState({});
  const placeInfo = [
    { icon: <FaWeightHanging className="text-xl" />, text: '무게 제한 없음' },
    { icon: <GiBarbecue className="text-2xl" />, text: '바베큐' },
    { icon: <GiCampfire className="text-xl" />, text: '불멍' },
    { icon: <GiWoodenFence className="text-xl" />, text: '울타리 있음' },
    { icon: <TbParkingCircleFilled className="text-xl" />, text: '주차 가능' },
  ];
  useEffect(() => {
    const fetchPentionData = async () => {
      try {
        const response = await GetPentionData();
        console.log('장소 정보:', response);
        setBasicPension(response.data);
      } catch (error) {
        console.error('반려동물 정보 가져오기 오류:', error);
      }
    };

    // if (pensionId) {
    fetchPentionData();
    // }
  }, []);
  return (
    <div className="flex items-center p-4 bg-white rounded-lg">
      <div className="min-w-40 h-40 bg-[#D9D9D9] flex rounded-lg items-center justify-center ">
        <div className="text-[#8A8A8A] text-4xl flex">
          <FaCamera />
        </div>
      </div>
      <div className="flex flex-col w-full h-full pl-5">
        <div className="flex flex-row justify-between">
          <div className="flex mb-1 text-2xl font-semibold">
            {basicPension.pensionName}
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
          {/* <span className="ml-1 text-[#8A8A8A]">내용</span> */}
          <span className="ml-1 text-[#8A8A8A]">
            ({basicPension.reviewCount})
          </span>
        </div>
        <div className="flex justify-around mt-6">
          <div className="flex gap-2">
            {placeInfo.map((info, index) => (
              <div
                key={index}
                className="flex ml-1 gap-1 text-[#8A8A8A] items-center justify-center"
              >
                <span>{info.icon}</span>
                <span>{info.text}</span>
              </div>
            ))}
          </div>
        </div>
        {basicPension.description}
      </div>
    </div>
  );
};

export default PlaceData;
