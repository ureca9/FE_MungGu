import { Link, useNavigate } from 'react-router-dom';
import ROUTER_PATHS from '../../utils/RouterPath';
import LOCAL_STORAGE_KEYS from '../../utils/LocalStorageKey';
import useLoginStore from '../../stores/login';

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setLogout } = useLoginStore();

  const handleLogout = () => {
    Object.values(LOCAL_STORAGE_KEYS).forEach((key) =>
      localStorage.removeItem(key),
    );

    setLogout();
    navigate(ROUTER_PATHS.MAIN);
  };

  return (
    <header className="fixed top-0 left-0 z-10 w-full border-b border-gray-300 backdrop-blur-md">
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
