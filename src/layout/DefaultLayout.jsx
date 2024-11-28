import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/common/Header.jsx';
import SubHeader from '../components/common/SubHeader.jsx';
import FooterNav from '../components/common/FooterNav.jsx';

const DefaultLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-svh w-full sm:max-w-[768px] mx-auto shadow-2xl">
      {isHome ? <Header /> : <SubHeader />}
      <main className="flex-grow pt-16 pb-20">
        <Outlet />
        <div className="h-[2000px]">
          <h1 className="py-10 text-3xl text-center">스크롤 테스트</h1>
          <p className="text-center">테스트</p>
        </div>
      </main>
      <FooterNav />
    </div>
  );
};

export default DefaultLayout;
