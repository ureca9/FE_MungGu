import { useNavigate } from 'react-router-dom';
import petgray from '../../assets/common/petgray.svg';
const MyPage = () => {
  const petList = [
    { name: '토리', src: petgray },
    { name: '모리', src: petgray },
    { name: '젤리', src: petgray },
  ];
  const serviceList = [
    { name: '이벤트', path: '/' },
    { name: '내 예약', path: '/' },
    { name: '내가 쓴 후기', path: '/' },
    { name: '최근 본 장소', path: '/' },
  ];
  const appList = [
    { name: '설정', path: '/' },
    { name: '고객센터', path: '/' },
    { name: '공지사항', path: '/' },
  ];
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col bg-gray-100">
        <div className="bg-white m-5 h-40 ">
          사용자
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate('/user-update');
            }}
            className="bg-sky-400 hover:bg-sky-500 p-1"
          >
            수정
          </button>
        </div>
        <div className='flex flex-col bg-white mx-5 mb-5 h-40'>
          <div className='flex items-center'>
          마이펫
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate('/pet-update');
            }}
            className="flex bg-sky-400 hover:bg-sky-500 p-1"
            >
            편집
          </button>
            </div>
            <div className='flex'>
          {petList.map((pet)=>(<div key={pet.name} className="hover:bg-sky-500 p-1 m-1">
            <img src={pet.src} />
          </div>))}
            </div>
        </div>
        <div className="bg-white mx-5 mb-5 h-auto ">
          서비스 관리 <br />
          <div className="flex flex-col">
            {serviceList.map((service) => (
              <button
                key={service.name}
                onClick={() => {
                  navigate(service.path);
                }}
                className=" hover:bg-sky-500 p-1 w-24 m-1"
              >
                {service.name}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white mx-5 mb-5 h-auto ">
          앱 이용 <br />
          <div className="flex flex-col">
            {appList.map((app) => (
              <button
                key={app.name}
                onClick={() => {
                  navigate(app.path);
                }}
                className=" hover:bg-sky-500 p-1 w-24 m-1"
              >
                {app.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
