import { NavLink, useLocation } from "react-router-dom";
import { FaMap, FaRegMap, FaUser, FaRegUser } from "react-icons/fa";
import { GrHomeRounded, GrSearch } from "react-icons/gr";
import FooterLogo from "../../assets/common/footer/FooterLogo.svg";
import meongsengneacutOn from "../../assets/common/footer/meongsengneacutOn.svg";
import meongsengneacutOff from "../../assets/common/footer/meongsengneacutOff.svg";
import meongsengneacutHover from "../../assets/common/footer/meongsengneacutHover.svg";
import { useState } from "react";
import ROUTER_PATHS from "../../utils/RouterPath";
import SearchModal from "../MainPage/SearchModal/SearchModal";

const navItems = [
  {
    path: ROUTER_PATHS.MAP,
    label: "지도",
    icon: {
      active: <FaMap size={20} />,
      inactive: <FaRegMap size={20} />,
      hover: <FaMap size={20} color="#3B82F6" />,
    },
  },
  {
    path: ROUTER_PATHS.SEARCH,
    label: "검색",
    icon: {
      active: <GrSearch size={20} />,
      inactive: <GrSearch size={20} />,
      hover: <GrSearch size={20} color="#3B82F6" />,
    },
  },
  {
    path: ROUTER_PATHS.MAIN,
    label: "홈",
    icon: null,
  },
  {
    path: ROUTER_PATHS.MUNGSENGNEACUT,
    label: "멍생네컷",
    icon: {
      active: (
        <img
          src={meongsengneacutOn}
          alt="멍생네컷 활성화"
          className="w-5 h-5"
        />
      ),
      inactive: (
        <img
          src={meongsengneacutOff}
          alt="멍생네컷 비활성화"
          className="w-5 h-5"
        />
      ),
      hover: (
        <img
          src={meongsengneacutHover}
          alt="멍생네컷 호버"
          className="w-5 h-5"
        />
      ),
    },
  },
  {
    path: ROUTER_PATHS.MY_PAGE,
    label: "마이",
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
  const [isSearchModalOpen, setSearchModalOpen] = useState(false); // SearchModal 열림 상태 관리

  const handleMouseEnter = (path) => {
    setHoveredPath(path);
  };

  const handleMouseLeave = () => {
    setHoveredPath(null);
  };

  return (
    <>
      <footer className="fixed bottom-0 z-40 max-w-[768px] w-full h-16 bg-white border-t border-[#F3F4F5]">
        <nav className="flex items-center justify-between h-full px-8 mx-auto lg:px-16">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center text-xs w-11 h-11 ${
                  isActive ? "text-black font-bold" : "text-gray-500"
                } hover:text-blue-500`
              }
              onMouseEnter={() => handleMouseEnter(item.path)}
              onMouseLeave={handleMouseLeave}
              onClick={
                item.path === ROUTER_PATHS.SEARCH 
                  ? (e) => {
                      e.preventDefault(); 
                      setSearchModalOpen(true);
                    }
                  : undefined
              }
            >
              {item.path === "/" && location.pathname !== "/" ? (
                <div className="flex flex-col items-center justify-center w-11 h-11">
                  <GrHomeRounded size={20} />
                  <div className="mt-1 text-xs">{item.label}</div>
                </div>
              ) : item.path === "/" ? (
                <img src={FooterLogo} alt="메인 로고" className="w-11 h-11" />
              ) : (
                <>
                  {item.icon && typeof item.icon === "object"
                    ? hoveredPath === item.path && item.icon.hover
                      ? item.icon.hover
                      : location.pathname === item.path
                      ? item.icon.active
                      : item.icon.inactive
                    : null}
                  <span className="mt-1 text-xs whitespace-nowrap">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </footer>

      {/* Search Modal */}
      {isSearchModalOpen && (
        <SearchModal onClose={() => setSearchModalOpen(false)} />
      )}
    </>
  );
};

export default FooterNav;
