import { useNavigate } from 'react-router-dom';
import ROUTER_PATHS from '../../utils/RouterPath';
import petFourPic from '../../assets/MypageImg/petFourpic.svg';
import { IoHeartCircleSharp } from 'react-icons/io5';
import MyPageImg from '../../assets/MypageImg/MyPageImg.png';
const ServiceList = () => {
  const navigate = useNavigate();
  const serviceList = [
    {
      name: '멍생네컷',
      path: ROUTER_PATHS.MUNGSENGNEACUT,
      icon: <img src={petFourPic} alt="멍생네컷" />,
    },
    {
      name: '즐겨찾기',
      path: ROUTER_PATHS.MAP,
      icon: (
        <div className="text-[#F54B6A] -ml-1">
          <IoHeartCircleSharp />
        </div>
      ),
    },
    {
      name: '내가 쓴 후기',
      path: ROUTER_PATHS.MY_REVIEW,
      icon: (
        <div
          className="w-[24px] h-[24px]"
          style={{
            backgroundImage: `url(${MyPageImg})`,
            backgroundPosition: '-54px -133px',
          }}
        ></div>
      ),
    },
    {
      name: '최근 본 장소',
      path: ROUTER_PATHS.VIEW_HISTORY,
      icon: (
        <div
          className="w-[24px] h-[24px]"
          style={{
            backgroundImage: `url(${MyPageImg})`,
            backgroundPosition: '-149px -54px',
          }}
        ></div>
      ),
    },
  ];
  return (
    <div className="h-auto p-5 bg-white border rounded-lg md:py-8 md:px-9 border-borderlineGray">
      <div className="mb-3 text-xl text-textGray">서비스 관리</div>
      <div className="flex flex-col">
        {serviceList.map((service) => (
          <label key={service.name} className="flex items-center my-3 w-52">
            <div className="flex text-3xl cursor-pointer">
              <div>{service.icon}</div>
            </div>
            <button
              onClick={() => {
                if (service.name === '멍생네컷') {
                  navigate(service.path, { state: { selectedTab: 1 } });
                } else {
                  navigate(service.path);
                }
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
