import { NavLink } from 'react-router-dom';
import { FaHeart, FaMap, FaSearch, FaUser } from 'react-icons/fa';

const navItems = [
  { path: '/like', label: '찜', icon: FaHeart },
  { path: '/search', label: '검색', icon: FaSearch },
  { path: '/', label: '메인', icon: null },
  { path: '/map', label: '지도', icon: FaMap },
  { path: '/my-page', label: '내정보', icon: FaUser },
];

const FooterNav = () => {
  return (
    <nav className="flex justify-around items-center bg-white border-t border-gray-300 p-4">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center text-gray-500 hover:text-blue-500 ${
              isActive ? 'text-black' : ''
            }`
          }
        >
          {item.icon ? (
            <>
              <item.icon size={24} />
              <span className="text-xs mt-1">{item.label}</span>
            </>
          ) : (
            <img alt="메인 로고" className="h-8 w-auto" />
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default FooterNav;
