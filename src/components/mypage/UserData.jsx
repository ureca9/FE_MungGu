import Swal from 'sweetalert2';
import useLoginStore from '../../stores/Auth/useLoginStore';
import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';
import LOCAL_STORAGE_KEYS from '../../utils/LocalStorageKey';
import ROUTER_PATHS from '../../utils/RouterPath';
import userIcon from '../../assets/MypageImg/user.svg';
import PropTypes from 'prop-types';

const UserData = ({ memberD, navigate }) => {
  UserData.propTypes = {
    memberD: PropTypes.shape({
      profileImageUrl: PropTypes.string,
      nickname: PropTypes.string,
    }),
    navigate: PropTypes.func.isRequired,
  };
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
    <div className="h-auto py-5 mt-5 bg-white border rounded-lg px-9 border-borderlineGray min-h-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={memberD?.profileImageUrl || userIcon}
            alt="사용자 프로필 이미지"
            className="rounded-full size-20 bg-[#F5F5F5] border border-[#8A8A8A] user-icon"
          />
          <span className="ml-4 text-base">
            {memberD?.nickname || '로그인이 필요합니다'}
          </span>
        </div>
        <div className="justify-between">
          {!isLoggedIn ? (
            <button
              onClick={() => navigate(ROUTER_PATHS.LOGIN)}
              className="text-sm px-2 py-1 font-bold text-[#3288FF] bg-transparent border-none cursor-pointer"
            >
              로그인
            </button>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="text-sm mr-4 font-bold text-[#FF0000] bg-transparent border-none cursor-pointer"
              >
                로그아웃
              </button>
              <CRUDBtn
                styleType="reverseBlue"
                size="xs"
                label="수정"
                onClick={() => navigate(ROUTER_PATHS.USER_EDIT)}
              />
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between w-full pt-4 mt-4 border-t-[1px] text-[#8a8a8a] text-sm">
        <div className="w-full text-center">
          <button
            className="px-2 py-1"
            onClick={() => navigate(ROUTER_PATHS.PLANT_EDIT)}
          >
            선호 시설 수정
          </button>
        </div>
        <div className="py-1">|</div>
        <div className="w-full text-center">
          <button
            className="px-2 py-1"
            onClick={() => navigate(ROUTER_PATHS.REGION_EDIT)}
          >
            선호 지역 수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserData;
