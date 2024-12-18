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
  const type = plcPenType;
  const id = plcPenType === '020' ? pensionId : placeId;

  useEffect(() => {
    const fetchPentionData = async () => {
      try {
        const response = await GetPentionData({ type, id });
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
    <div className="bg-[#F3F4F5] w-full h-40 md:h-full px-2 md:px-7 pt-4 md:pt-7 gap-5 flex flex-col">
      <div className="flex items-center w-full h-full p-2 bg-white rounded-lg md:p-4">
        {basicPension.fileUrl ? (
          <img
            src={basicPension.fileUrl}
            alt="펜션 이미지"
            className="w-56 rounded-lg opacity-100 h-28 md:h-40 md:w-80"
          />
        ) : (
          <div className="md:min-w-40 md:h-40 w-24 h-28 bg-[#D9D9D9] flex rounded-lg items-center justify-center ">
            <div className="text-[#8A8A8A] text-4xl flex">
              <FaCamera />
            </div>
          </div>
        )}
        <div className="flex flex-col justify-center w-full h-full pl-5">
          <div className="flex flex-row justify-between">
            <div className="flex mb-2 text-lg font-semibold md:mb-5 md:text-2xl line-clamp-1">
              {basicPension.name}
            </div>
            <div className="flex items-center justify-center gap-2 text-xl">
              <div className="text-2xl ">
                <PiShareNetworkThin />
              </div>
            </div>
          </div>
          <div className="flex mb-1 text-[#8A8A8A] line-clamp-2">{basicPension.address}</div>
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
          {/* <div className="flex mt-6 md:justify-around"> */}
            {/* <div className="flex h-full gap-2 ">
              {placeInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex ml-1 gap-1 text-[#8A8A8A] items-center justify-center"
                >
                  <span className="hidden md:block md:text-base">{info.icon}</span>
                  <span className="text-xs md:text-base">{info.text}</span>
                </div>
              ))}
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default PlaceData;
