import { FaCamera } from 'react-icons/fa';
import { RxStarFilled } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

const ViewHistoryCard = ({ data }) => {
  const navigate = useNavigate();
  const {
    image,
    placeName,
    address,
    reviewAvg,
    reviewCount,
    businessHour,
    introduction,
    pensionName,
    description,
    placeid,
    pensionId,
  } = data;
  const handleCardClick = () => {
    const path = placeid ? `/place/${placeid}` : `/pension-detail/${pensionId}`;
    navigate(path);
  };
  return (
    <div
      onClick={handleCardClick}
      className="pt-4 transition duration-300 transform rounded-lg cursor-pointer md:px-4 hover:scale-105"
    >
      <div className="relative flex justify-between w-full ">
        {image ? (
          <img
            src={image}
            alt={placeName}
            className="object-cover w-1/3 rounded-lg md:w-56 h-36"
          />
        ) : (
          <div className="w-1/3 rounded-lg h-36 bg-[#D9D9D9] flex items-center justify-center text-[#8A8A8A] text-3xl">
            <FaCamera />
          </div>
        )}
        <div className="w-2/3 ml-5 ajustify-between">
          <div className="">
            <div className="">
              <div className="flex items-center ">
                <span className="text-[#FDBD00] text-xl">
                  <RxStarFilled />
                </span>
                <div className="flex items-end justify-center ">
                  <span className="ml-1 font-semibold">{reviewAvg}</span>
                  <div className="font-extralight text-[#8A8A8A] text-sm ml-1">
                    {'('}
                    {reviewCount}
                    {')'}
                  </div>
                </div>
              </div>
            </div>
            <div className="my-1 text-xl line-clamp-1">
              {placeName ? <div>{placeName}</div> : <div>{pensionName}</div>}
            </div>
            <div className="text-[#8A8A8A] line-clamp-1">{address}</div>
            {businessHour ? (
              <>
                <div className="text-sm line-clamp-1">
                  운영시간 :{businessHour}
                </div>
                <div className="text-sm line-clamp-1">
                  시설정보 :{description}
                </div>
              </>
            ) : (
              <div className="text-sm line-clamp-3">
                소개글 <br />
                {introduction}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5 border"></div>
    </div>
  );
};

export default ViewHistoryCard;
