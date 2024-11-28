import { IoIosArrowBack } from 'react-icons/io';

const SubHeader = () => {
  return (
    <header className="fixed top-0 left-0 z-10 w-[768px] border-b border-gray-300 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 mx-auto">
        <IoIosArrowBack />
        <div>페이지제목</div>
        <div></div>
      </div>
    </header>
  );
};

export default SubHeader;
