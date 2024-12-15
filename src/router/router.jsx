import { createBrowserRouter } from 'react-router-dom';
import ROUTER_PATHS from '../utils/RouterPath.js';
import DefaultLayout from '../layout/DefaultLayout.jsx';
import Main from '../pages/Main.jsx';
import Map from '../pages/Map/Map.jsx';
import MyPage from '../pages/UserPage/MyPage.jsx';
import Search from '../pages/Search.jsx';
import PetAdd from '../pages/PetPage/PetAdd.jsx';
import PetEdit from '../pages/PetPage/PetEdit.jsx';
import UserEdit from '../pages/UserPage/UserEdit.jsx';
import MapSearch from '../pages/Map/MapSearch.jsx';
import Directions from '../pages/Map/Directions.jsx';
import PlaceDetailPage from '../pages/DetailPage/PlaceDetailPage.jsx';
import SearchModal from '../components/MainPage/SearchModal/SearchModal.jsx';
import ListPage from '../pages/ListPage/ListPage.jsx';
import PensionListPage from '../pages/ListPage/PensionListPage.jsx';
import PensionDetailPage from '../pages/DetailPage/PensionDetailPage.jsx';
import Login from '../pages/Login.jsx';
import Meongsengneacut from '../pages/Meongsengneacut.jsx';
import UserRegister from './../pages/UserPage/UserRegister';
import PetRegister from '../pages/PetPage/PetRegister.jsx';
import PreferencePlant from '../pages/UserPage/PreferencePlant.jsx';
import PreferenceRegion from '../pages/UserPage/PreferenceRegion.jsx';
import PlantEdit from '../pages/UserPage/PlantEdit.jsx';
import RegionEdit from '../pages/UserPage/RegionEdit.jsx';
import ReviewAdd from '../pages/Review/ReviewAdd.jsx';
import MyReview from '../pages/Review/MyReview.jsx';
import ReviewEdit from '../pages/Review/ReviewEdit.jsx';
import PensionAllReview from '../pages/Review/PensionAllReview.jsx';
import PlaceAllReview from '../pages/Review/PlaceAllReview.jsx';

const routes = [
  {
    path: ROUTER_PATHS.MAIN,
    element: <Main />,
  },
  {
    path: ROUTER_PATHS.MAP,
    element: <Map />,
  },
  {
    path: ROUTER_PATHS.MAP_SEARCH,
    element: <MapSearch />,
  },
  {
    path: ROUTER_PATHS.DIRECTIONS,
    element: <Directions />,
  },
  {
    path: ROUTER_PATHS.MY_PAGE,
    element: <MyPage />,
  },
  {
    path: ROUTER_PATHS.SEARCH,
    element: <Search />,
  },
  {
    path: ROUTER_PATHS.USER_EDIT,
    element: <UserEdit />,
  },
  {
    path: ROUTER_PATHS.PET_REGISTER,
    element: <PetRegister />,
  },
  {
    path: ROUTER_PATHS.PET_ADD,
    element: <PetAdd />,
  },
  {
    path: ROUTER_PATHS.PET_EDIT_ID,
    element: <PetEdit />,
  },
  {
    path: ROUTER_PATHS.SEARCH_MODAL,
    element: <SearchModal />,
  },
  {
    path: ROUTER_PATHS.FACILITY_LIST,
    element: <ListPage type="facility" />,
  },
  {
    path: ROUTER_PATHS.PENSION_LIST,
    element: <PensionListPage />,
  },
  {
    path: ROUTER_PATHS.PLACE_DETAIL,
    element: <PlaceDetailPage />,
  },
  {
    path: ROUTER_PATHS.PENSION_DETAIL,
    element: <PensionDetailPage />,
  },
  {
    path: ROUTER_PATHS.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTER_PATHS.USER_REGISTER,
    element: <UserRegister />,
  },
  {
    path: ROUTER_PATHS.MEONGSENGNEACUT,
    element: <Meongsengneacut />,
  },
  {
    path: ROUTER_PATHS.PREFERENCE_PLANT,
    element: <PreferencePlant />,
  },
  {
    path: ROUTER_PATHS.PREFERENCE_REGION,
    element: <PreferenceRegion />,
  },
  {
    path: ROUTER_PATHS.PLANT_EDIT,
    element: <PlantEdit />,
  },
  {
    path: ROUTER_PATHS.REGION_EDIT,
    element: <RegionEdit />,
  },
  {
    path: ROUTER_PATHS.PLACE_ALL_REVIEW,
    element: <PlaceAllReview />,
  },
  {
    path: ROUTER_PATHS.PENSION_ALL_REVIEW,
    element: <PensionAllReview />,
  },
  {
    path: ROUTER_PATHS.REVIEW_ADD,
    element: <ReviewAdd />,
  },
  {
    path: ROUTER_PATHS.MY_REVIEW,
    element: <MyReview />,
  },
  {
    path: ROUTER_PATHS.MY_REVIEW_EDIT,
    element: <ReviewEdit />,
  },
];

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: routes,
  },
]);

export default router;
