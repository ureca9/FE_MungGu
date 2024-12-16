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
    ROUTER_PATHS.MAP_SEARCH,
    ROUTER_PATHS.DIRECTIONS,
    ROUTER_PATHS.MY_PAGE,
    ROUTER_PATHS.LOGIN,
    ROUTER_PATHS.SEARCH,
    ROUTER_PATHS.LIVE_REVIEW,
    ROUTER_PATHS.USER_REGISTER,
    ROUTER_PATHS.PET_REGISTER,
    ROUTER_PATHS.PREFERENCE_PLANT,
    ROUTER_PATHS.PREFERENCE_REGION,
    ROUTER_PATHS.REGION_NAME,
    ROUTER_PATHS.PLACE_NAME,
    ROUTER_PATHS.PET_ADD,
    ROUTER_PATHS.USER_EDIT,
    ROUTER_PATHS.PET_EDIT_ID,
    ROUTER_PATHS.PLANT_EDIT,
    ROUTER_PATHS.REGION_EDIT,
    ROUTER_PATHS.RECENT_VIEW_LIST,
    ROUTER_PATHS.MY_REVIEW,
    ROUTER_PATHS.MEONGSENGNEACUT,
    ROUTER_PATHS.SEARCH_MODAL,
    ROUTER_PATHS.FACILITY_LIST,
    ROUTER_PATHS.PENSION_LIST,
    ROUTER_PATHS.PLACE_DETAIL,
    ROUTER_PATHS.PENSION_DETAIL,
    ROUTER_PATHS.REVIEW_ADD,
    ROUTER_PATHS.MY_REVIEW_EDIT,
    ROUTER_PATHS.PLACE_ALL_REVIEW,
    ROUTER_PATHS.PENSION_ALL_REVIEW,
    ROUTER_PATHS.VIEW_HISTORY,
  ].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-svh w-full sm:max-w-[768px] mx-auto shadow-2xl">
      {isSubHeaderPath ? <SubHeader /> : <Header />}
      <main className="pt-16 pb-16">
        <Outlet />
      </main>
      <FooterNav />
      <ScrollTop />
    </div>
  );
};

export default DefaultLayout;
