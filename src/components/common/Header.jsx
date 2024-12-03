import { Link, useNavigate } from 'react-router-dom';
import ROUTER_PATHS from '../../utils/RouterPath';
import useLoginStore from '../../stores/Auth/useLoginStore';

const LOCAL_STORAGE_KEYS = {
  MEMBER_ID: 'MEMBER_ID',
  EMAIL: 'EMAIL',
  NICKNAME: 'NICKNAME',
  NEW_MEMBER: 'NEW_MEMBER',
  PROFILE_IMAGE: 'PROFILE_IMAGE',
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  LOGIN_STORAGE: 'loginStorage',
};

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setLogout } = useLoginStore();

  const handleLogout = () => {
    setLogout();

    Object.values(LOCAL_STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });

    navigate(ROUTER_PATHS.MAIN);
  };

  return (
    <header className="fixed top-0 z-10 w-[768px] border-b border-gray-300 backdrop-blur-md">
      <div className="container flex items-center justify-center h-16 px-4 mx-auto">
        <Link
          to={ROUTER_PATHS.LOGIN}
          className="LogoFont text-[#3288FF] no-underline text-3xl"
        >
          멍티비티
        </Link>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="text-sm font-bold text-[#FF0000] bg-transparent border-none cursor-pointer"
          >
            로그아웃
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
