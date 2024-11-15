import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/map', label: '지도' },
  { path: '/like', label: '찜' },
  { path: '/', label: '메인' },
  { path: '/search', label: '검색' },
  { path: '/my-page', label: '내정보' },
];

const FooterNav = () => {
  return (
    <nav className="flex justify-around items-center bg-white border-t border-gray-300 p-4">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className="text-gray-500 hover:text-blue-500"
          activeClassName="text-blue-500 font-bold"
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default FooterNav;
