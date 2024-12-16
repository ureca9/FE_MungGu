import { useNavigate } from 'react-router-dom';
import ROUTER_PATHS from '../../utils/RouterPath';
import petFourPic from '../../assets/MypageImg/petFourpic.svg';
import { IoHeartCircleSharp } from 'react-icons/io5';
const ServiceList = () => {
  const navigate = useNavigate();
  const serviceList = [
    {
      name: '멍생네컷',
      path: '/',
      icon: <img src={petFourPic} alt="멍생네컷" />,
    },
    {
      name: '즐겨찾기',
      path: '/',
      icon: (
        <div className="text-[#F54B6A] -ml-1">
          <IoHeartCircleSharp />
        </div>
      ),
    },
    {
      name: '내가 쓴 후기',
      path: ROUTER_PATHS.MY_REVIEW,
      icon: 'bg-후기_아이콘',
    },
    {
      name: '최근 본 장소',
      path: ROUTER_PATHS.VIEW_HISTORY,
      icon: 'bg-최근_본_장소_아이콘',
    },
  ];
  return (
    <div className="h-auto py-8 bg-white border rounded-lg px-9 border-borderlineGray">
      <div className="mb-3 text-xl text-textGray">서비스 관리</div>
      <div className="flex flex-col">
        {serviceList.map((service) => (
          <label key={service.name} className="flex items-center my-3 w-52">
            <div className="flex text-3xl cursor-pointer">
              {service.name === '멍생네컷' || service.name === '즐겨찾기' ? (
                <div>{service.icon}</div>
              ) : (
                <div className={service.icon}></div>
              )}
            </div>
            <button
              onClick={() => {
                navigate(service.path);
              }}
              className="flex justify-start w-24 ml-[14px]"
            >
              {service.name}
            </button>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
