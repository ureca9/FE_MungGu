import MainLogo from '../../assets/common/MainLogo.svg';

const Header = () => {
  return (
    <header className="fixed top-0 z-10 w-[768px] border-b border-gray-300 backdrop-blur-md">
      <div className="container flex items-center justify-center h-16 mx-auto">
        <img src={MainLogo} alt="로고" className="w-auto h-8" />
      </div>
    </header>
  );
};

export default Header;
