import { useNavigate } from 'react-router-dom';
// import petgray from '../../assets/common/petgray.svg';
import { useEffect, useState } from 'react';
import { memberData } from '../../api/pet';
const MyPage = () => {
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
  const [memberD, setMemberD] = useState({ puppyList: [] });

  const userData = async () => {
    try {
      const Mdata = await memberData();
      console.log('API 응답:', Mdata.data);
      setMemberD(Mdata.data);
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col bg-gray-100">
        <div className="bg-white m-5 h-auto min-h-40">
          사용자 : {memberD.nickname}
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate('/user-edit');
            }}
            className="bg-sky-400 hover:bg-sky-500 p-1"
          >
            수정
          </button>
          <img src={memberD.profileImageUrl} />
        </div>
        <div className="flex flex-col bg-white mx-5 mb-5 h-40">
          <div className="flex items-center">
            마이펫
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate('/pet-edit');
              }}
              className="flex bg-sky-400 hover:bg-sky-500 p-1"
            >
              편집
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate('/pet-add');
              }}
              className="flex bg-sky-400 hover:bg-sky-500 p-1"
            >
              추가
            </button>
            <button onClick={userData}>시작</button>
          </div>
          <div className="flex">
            {memberD.puppyList.map((puppy) => (
              <div key={puppy.puppyId} className="hover:bg-sky-500 p-1 m-1">
                <img src={puppy.src} />
                {puppy.puppyName}
              </div>
            ))}
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
