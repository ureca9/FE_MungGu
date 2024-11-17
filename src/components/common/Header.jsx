import MainLogo from '../../assets/common/MainLogo.svg';

const Header = () => {
  return (
    <header className="transition-all duration-300 fixed top-0 left-0 w-full z-10 bg-transparent border-b border-gray-300">
      <div className="container mx-auto flex justify-center items-center h-16">
        <img src={MainLogo} alt="로고" className="h-8 w-auto" />
      </div>
    </header>
  );
};

export default Header;
