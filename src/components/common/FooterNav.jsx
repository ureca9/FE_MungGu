import { NavLink, useLocation } from 'react-router-dom';
import { FaMap, FaRegMap, FaUser, FaRegUser } from 'react-icons/fa';
import { GrHomeRounded, GrSearch } from 'react-icons/gr';
import FooterLogo from '../../assets/common/footer/FooterLogo.svg';
import meongsengneacutOn from '../../assets/common/footer/meongsengneacutOn.svg';
import meongsengneacutOff from '../../assets/common/footer/meongsengneacutOff.svg';
import meongsengneacutHover from '../../assets/common/footer/meongsengneacutHover.svg';
import { useState } from 'react';
import ROUTER_PATHS from '../../utils/RouterPath';

const navItems = [
  {
    path: ROUTER_PATHS.MAP,
    label: '지도',
    icon: {
      active: <FaMap size={20} />,
      inactive: <FaRegMap size={20} />,
      hover: <FaMap size={20} color="#3B82F6" />,
    },
  },
  {
    path: ROUTER_PATHS.SEARCH,
    label: '검색',
    icon: {
      active: <GrSearch size={20} />,
      inactive: <GrSearch size={20} />,
      hover: <GrSearch size={20} color="#3B82F6" />,
    },
  },
  {
    path: ROUTER_PATHS.MAIN,
    label: '홈',
    icon: null,
  },
  {
    path: ROUTER_PATHS.MEONGSENGNEACUT,
    label: '멍생네컷',
    icon: {
      active: (
        <img
          src={meongsengneacutOn}
          alt="멍생네컷 활성화"
          className="w-6 h-6"
        />
      ),
      inactive: (
        <img
          src={meongsengneacutOff}
          alt="멍생네컷 비활성화"
          className="w-6 h-6"
        />
      ),
      hover: (
        <img
          src={meongsengneacutHover}
          alt="멍생네컷 호버"
          className="w-6 h-6"
        />
      ),
    },
  },
  {
    path: ROUTER_PATHS.MY_PAGE,
    label: '마이',
    icon: {
      active: <FaUser size={20} />,
      inactive: <FaRegUser size={20} />,
      hover: <FaUser size={20} color="#3B82F6" />,
    },
  },
];

const FooterNav = () => {
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(null);

  const handleMouseEnter = (path) => {
    setHoveredPath(path);
  };

  const handleMouseLeave = () => {
    setHoveredPath(null);
  };

  return (
    <footer className="fixed bottom-0 left-0 z-10 w-full h-16 bg-white border-t border-gray-300">
      <nav className="max-w-[768px] mx-auto flex justify-between items-center h-full px-8 lg:px-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive ? 'text-black font-bold' : 'text-gray-500'
              } hover:text-blue-500`
            }
            onMouseEnter={() => handleMouseEnter(item.path)}
            onMouseLeave={handleMouseLeave}
          >
            {item.path === '/' && location.pathname !== '/' ? (
              <div className="flex flex-col items-center justify-center w-11 h-11">
                <GrHomeRounded size={20} />
                <div className="mt-1 text-xs">{item.label}</div>
              </div>
            ) : item.path === '/' ? (
              <img src={FooterLogo} alt="메인 로고" className="w-auto h-11" />
            ) : (
              <>
                {item.icon && typeof item.icon === 'object'
                  ? hoveredPath === item.path && item.icon.hover
                    ? item.icon.hover
                    : location.pathname === item.path
                      ? item.icon.active
                      : item.icon.inactive
                  : null}
                <span className="mt-1 text-xs">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </footer>
  );
};

export default FooterNav;
