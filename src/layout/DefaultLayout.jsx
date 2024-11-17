import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header.jsx';
import FooterNav from '../components/common/FooterNav.jsx';

const DefaultLayout = () => {
  return (
    <div className="flex flex-col min-h-svh w-full sm:max-w-[800px] mx-auto ">
      <Header />
      <main className="flex-grow pt-16">
        <div className="h-[2000px] bg-gray-100">
          <h1 className="text-3xl text-center py-10">스크롤 테스트</h1>
          <p className="text-center">테스트</p>
        </div>
        <Outlet />
      </main>
      <FooterNav />
    </div>
  );
};

export default DefaultLayout;
