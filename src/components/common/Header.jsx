import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-10 w-full border-b border-gray-300 backdrop-blur-md">
      <Link
        to="/login"
        className="container flex items-center justify-center h-16 mx-auto LogoFont text-[#3288FF] no-underline text-3xl"
      >
        멍티비티
      </Link>
    </header>
  );
};

export default Header;
