import Swal from 'sweetalert2';
import useLoginStore from '../../stores/Auth/useLoginStore.js';
import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';
import LOCAL_STORAGE_KEYS from '../../utils/LocalStorageKey';
import ROUTER_PATHS from '../../utils/RouterPath';
import userIcon from '../../assets/MypageImg/user.svg';
const UserData = ({ memberD, navigate }) => {
  const { isLoggedIn, setLogout } = useLoginStore();

  const handleLogout = () => {
    Swal.fire({
      title: '정말 로그아웃 하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '로그아웃',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        Object.values(LOCAL_STORAGE_KEYS).forEach((key) =>
          localStorage.removeItem(key),
        );
        setLogout();
        navigate(ROUTER_PATHS.MAIN);
      }
    });
  };
  return (
    <div className="flex items-center justify-between h-auto py-5 mt-5 bg-white border rounded-lg px-9 border-borderlineGray min-h-40">
      <span className="flex items-center ">
        <img
          src={memberD?.profileImageUrl || userIcon}
          alt="사용자 프로필 이미지"
          className="rounded-full size-20 bg-[#F5F5F5] border border-[#8A8A8A] user-icon"
        />
        <span className="ml-4 text-base">
          {memberD?.nickname || '닉네임 없음'}
        </span>
      </span>
      <div className="justify-between ">
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="text-sm mr-4 font-bold text-[#FF0000] bg-transparent border-none cursor-pointer"
          >
            로그아웃
          </button>
        )}
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
    </div>
  );
};

export default UserData;
