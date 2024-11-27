import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { memberData } from '../../api/pet';
import ServiceList from './ServiceList';
import AppList from './AppList';
import UserD from './UserD';
import MyPet from './MyPet';
const MyPage = () => {
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
        <UserD memberD={memberD} navigate={navigate} />
        <MyPet memberD={memberD} navigate={navigate} />
        <ServiceList />
        <AppList />
      </div>
    </div>
  );
};

export default MyPage;
