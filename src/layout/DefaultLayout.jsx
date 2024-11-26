import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header.jsx';
import FooterNav from '../components/common/FooterNav.jsx';

const DefaultLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full sm:max-w-[768px] mx-auto shadow-2xl">
      <Header />
      <main className="pt-16 pb-16">
        <Outlet />
      </main>
      <FooterNav />
    </div>
  );
};

export default DefaultLayout;
