import { NavLink, useLocation } from 'react-router-dom';
import {
  FaHeart,
  FaRegHeart,
  FaMap,
  FaRegMap,
  FaUser,
  FaRegUser,
} from 'react-icons/fa';
import { GrHomeRounded, GrSearch } from 'react-icons/gr';
import FooterLogo from '../../assets/common/FooterLogo.svg';

const navItems = [
  {
    path: '/like',
    label: '찜',
    icon: { active: FaHeart, inactive: FaRegHeart },
  },
  { path: '/search', label: '검색', icon: GrSearch },
  { path: '/', label: '홈', icon: null },
  { path: '/map', label: '지도', icon: { active: FaMap, inactive: FaRegMap } },
  {
    path: '/my-page',
    label: '마이',
    icon: { active: FaUser, inactive: FaRegUser },
  },
];

const FooterNav = () => {
  const location = useLocation();

  return (
    <footer className="fixed bottom-0 left-0 z-40 w-full h-16 bg-white border-t border-gray-300">
      <nav className="max-w-[768px] mx-auto flex justify-between items-center h-full px-8 lg:px-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${isActive ? 'text-black font-bold' : 'text-gray-500'} hover:text-blue-500`
            }
          >
            {item.path === '/' && location.pathname !== '/' ? (
              <div className="flex flex-col items-center justify-center w-11 h-11">
                <GrHomeRounded size={20} />
                <div className="mt-1 text-xs">{item.label}</div>
              </div>
            ) : item.path === '/' ? (
              <img src={FooterLogo} alt="메인 로고" className="w-auto h-11" />
            ) : item.icon ? (
              <>
                {typeof item.icon === 'object' ? (
                  location.pathname === item.path ? (
                    <item.icon.active size={20} />
                  ) : (
                    <item.icon.inactive size={20} />
                  )
                ) : (
                  <item.icon size={20} />
                )}
                <span className="mt-1 text-xs">{item.label}</span>
              </>
            ) : (
              <div className="w-11 h-11">
                <GrHomeRounded size={20} />
                <div className="mt-1 text-xs">{item.label}</div>
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </footer>
  );
};

export default FooterNav;
