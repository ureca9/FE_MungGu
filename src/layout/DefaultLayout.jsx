import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/common/Header.jsx';
import SubHeader from '../components/common/SubHeader.jsx';
import FooterNav from '../components/common/FooterNav.jsx';
import ROUTER_PATHS from '../utils/RouterPath.js';
import ScrollTop from './../utils/ScrollTop';

const DefaultLayout = () => {
  const location = useLocation();

  const isSubHeaderPath = [
    ROUTER_PATHS.MAP,
    ROUTER_PATHS.MY_PAGE,
    ROUTER_PATHS.LOGIN,
    ROUTER_PATHS.SEARCH,
    ROUTER_PATHS.LIVE_REVIEW,
    ROUTER_PATHS.USER_REGISTER,
    ROUTER_PATHS.DOG_REGISTER,
    ROUTER_PATHS.PREFERENCE_PLANT,
    ROUTER_PATHS.PREFERENCE_REGION,
    ROUTER_PATHS.REGION_NAME,
    ROUTER_PATHS.PLACE_NAME,
    ROUTER_PATHS.ALL_REVIEW,
    ROUTER_PATHS.DOG_UPDATE,
    ROUTER_PATHS.DOG_ADD,
    ROUTER_PATHS.USER_UPDATE,
    ROUTER_PATHS.MY_REVIEW,
    ROUTER_PATHS.MY_REVIEW_MODIFY,
    ROUTER_PATHS.RECENT_VIEW_LIST,
    ROUTER_PATHS.RESERVATION,
    ROUTER_PATHS.RESERVATION_COMPLETE,
    ROUTER_PATHS.RESERVATION_LIST,
    ROUTER_PATHS.MEONGSENGNEACUT,
  ].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-svh w-full sm:max-w-[768px] mx-auto shadow-2xl">
      {isSubHeaderPath ? <SubHeader /> : <Header />}
      <main className="flex-grow pt-16 pb-20">
        <Outlet />
      </main>
      <FooterNav />
      <ScrollTop />
    </div>
  );
};

export default DefaultLayout;
