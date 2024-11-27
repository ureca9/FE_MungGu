import { useNavigate } from 'react-router-dom';
import petgray from '../../assets/common/petgray.svg';
import { useEffect, useState } from 'react';
import { memberData } from '../../api/pet';
import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';
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

  useEffect(() => {
    userData();
  }, []);

  return (
    <div className="bg-backgroundGray">
      <div className="flex flex-col gap-5 mx-5">
        <div className="flex items-center justify-between h-auto py-5 mt-5 bg-white border rounded-lg px-9 border-borderlineGray min-h-40">
          <span className="flex items-center ">
            <img
              src={memberD?.profileImageUrl}
              alt="프로필 이미지"
              className="rounded-full size-20"
            />
            <span className="ml-4 text-base">{memberD?.nickname}</span>
          </span>
          <CRUDBtn
            styleType="reverseBlue"
            size="xs"
            label="수정"
            onClick={(e) => {
              e.preventDefault();
              navigate('/user-edit');
            }}
          />
        </div>
        <div className="flex flex-col h-auto py-5 bg-white border rounded-lg px-9 border-borderlineGray">
          <div className="flex items-center justify-between mb-6">
            <span>
              <span className="text-lg text-textGray">마이펫</span>
              <span className="text-[#3288FF] ml-1">
                {memberD?.puppyList.length}
              </span>
            </span>
            <CRUDBtn
              styleType="reverseBlue"
              size="xs"
              label="편집"
              onClick={(e) => {
                e.preventDefault();
                navigate('/pet-edit');
              }}
            />
            {/* <button onClick={userData}>시작</button> */}
          </div>
          <div className="flex items-center gap-5">
            {memberD?.puppyList.map((puppy) => (
              <div key={puppy.puppyId} className="flex-col hover:bg-sky-500">
                <img
                  src={puppy.src || petgray}
                  alt="마이펫 이미지"
                  className="bg-gray-200 rounded-full size-16"
                />
                <span className="flex justify-center text-textGray">
                  {puppy.puppyName}
                </span>
              </div>
            ))}
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate('/pet-add');
              }}
              className="flex-col hover:bg-sky-500"
            >
              <img
                src={petgray}
                alt="펫 추가 이미지"
                className="bg-gray-200 rounded-full size-16"
              />
              <span className="flex justify-center text-textGray">추가</span>
            </button>
          </div>
        </div>
        <div className="h-auto py-5 bg-white border rounded-lg px-9 border-borderlineGray">
          <div className="mb-3 text-lg text-textGray">서비스 관리</div>
          <div className="flex flex-col">
            {serviceList.map((service) => (
              <button
                key={service.name}
                onClick={() => {
                  navigate(service.path);
                }}
                className="flex justify-start w-24 py-2 hover:bg-slate-300"
              >
                {service.name}
              </button>
            ))}
          </div>
        </div>
        <div className="h-auto py-5 mb-5 bg-white border rounded-lg px-9 border-borderlineGray">
          <div className="mb-3 text-lg text-textGray">앱 이용</div>
          <div className="flex flex-col">
            {appList.map((app) => (
              <button
                key={app.name}
                onClick={() => {
                  navigate(app.path);
                }}
                className="flex justify-start w-24 py-2 hover:bg-slate-300"
              >
                {app.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
