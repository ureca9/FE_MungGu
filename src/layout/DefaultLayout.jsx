import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header.jsx';
import FooterNav from '../components/common/FooterNav.jsx';

const DefaultLayout = () => {
  return (
    <div className="flex flex-col min-h-svh w-full sm:max-w-[800px] mx-auto">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <FooterNav />
    </div>
  );
};

export default DefaultLayout;
