import { NavLink } from 'react-router-dom';
import { FaHeart, FaMap, FaSearch, FaUser } from 'react-icons/fa';
import FooterLogo from '../../assets/common/FooterLogo.svg';

const navItems = [
  { path: '/like', label: '찜', icon: FaHeart },
  { path: '/search', label: '검색', icon: FaSearch },
  { path: '/', label: '메인', icon: null },
  { path: '/map', label: '지도', icon: FaMap },
  { path: '/my-page', label: '내정보', icon: FaUser },
];

const FooterNav = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-300 fixed bottom-0 left-0 z-10">
      <nav className="max-w-[800px] mx-auto flex justify-between items-center p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs mt-1 ${
                isActive ? 'text-black' : 'text-gray-500'
              } hover:text-blue-500`
            }
          >
            {item.icon ? (
              <>
                <item.icon size={24} />
                <span className="text-xs mt-1">{item.label}</span>
              </>
            ) : (
              <img src={FooterLogo} alt="메인 로고" className="h-14 w-auto" />
            )}
          </NavLink>
        ))}
      </nav>
    </footer>
  );
};

export default FooterNav;
