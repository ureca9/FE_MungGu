import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { memberData } from '../../api/pet';
import AppList from '../../components/mypage/AppList';
import MyPet from '../../components/mypage/MyPet';
import ServiceList from '../../components/mypage/ServiceList';
import UserData from '../../components/mypage/UserData';
const MyPage = () => {
  const navigate = useNavigate();
  const [memberD, setMemberD] = useState({ puppyList: [] });

  const userData = async () => {
    try {
      const Mdata = await memberData();
      setMemberD(Mdata.data);
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    if (!memberD?.nickname) {
      userData();
    }
  }, [memberD]);

  return (
    <div className="h-dvh bg-backgroundGray">
      <div className="flex flex-col gap-5 mx-5">
        <UserData memberD={memberD} navigate={navigate} />
        <MyPet memberD={memberD} navigate={navigate} />
        <ServiceList />
        <AppList />
      </div>
    </div>
  );
};

export default MyPage;
