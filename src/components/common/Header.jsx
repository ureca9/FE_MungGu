import { Link } from 'react-router-dom';
import ROUTER_PATHS from '../../utils/RouterPath';

const Header = () => {
  return (
    <header className="fixed top-0 z-10 w-[768px] border-b border-gray-300 backdrop-blur-md">
      <div className="container flex items-center justify-center h-16 px-4 mx-auto">
        <Link
          to={ROUTER_PATHS.MAIN}
          className="LogoFont text-[#3288FF] no-underline text-3xl"
        >
          멍티비티
        </Link>
      </div>
    </header>
  );
};

export default Header;
