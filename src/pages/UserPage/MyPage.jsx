import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppList from '../../components/mypage/AppList';
import MyPet from '../../components/mypage/MyPet';
import ServiceList from '../../components/mypage/ServiceList';
import UserData from '../../components/mypage/UserData';
import { GetmemberData } from '../../api/pet';
const MyPage = () => {
  const navigate = useNavigate();
  const [memberD, setMemberD] = useState({ puppyList: [] });

  const userData = async () => {
    try {
      const Mdata = await GetmemberData();
      setMemberD(Mdata.data);
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    if (!memberD.nickname) {
      userData();
    }
  }, [memberD]);

  return (
    <div className="bg-backgroundGray min-w-96 sm:w-full">
      <div className="flex flex-col gap-3 mx-2 sm:gap-5 sm:mx-5">
        <UserData memberD={memberD} navigate={navigate} />
        <MyPet memberD={memberD} navigate={navigate} />
        <ServiceList />
        <AppList />
      </div>
    </div>
  );
};

export default MyPage;
