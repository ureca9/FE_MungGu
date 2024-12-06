import { createBrowserRouter } from 'react-router-dom';
import ROUTER_PATHS from '../utils/RouterPath.js';
import DefaultLayout from '../layout/DefaultLayout.jsx';
import Main from '../pages/Main.jsx';
import Like from '../pages/Like.jsx';
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
import ListPage from '../pages/ListPage/ListPage.jsx'; // ListPage 경로 확인
import PensionListPage from '../pages/ListPage/PensionListPage.jsx';
import PensionDetailPage from '../pages/DetailPage/PensionDetailPage.jsx';
import Login from '../pages/Login.jsx';
import Meongsengneacut from '../pages/Meongsengneacut.jsx';
import UserRegister from './../pages/UserPage/UserRegister';
import PetRegister from '../pages/PetPage/PetRegister.jsx';
import PreferencePlant from '../pages/UserPage/PreferencePlant.jsx';
import PreferenceRegion from '../pages/UserPage/PreferenceRegion.jsx';
import AllReviews from '../pages/Review/ALlReviews.jsx';
import ReviewAdd from '../pages/Review/ReviewAdd.jsx';

const routes = [
  {
    path: ROUTER_PATHS.MAIN,
    element: <Main />,
  },
  {
    path: ROUTER_PATHS.LIKE,
    element: <Like />,
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
    path: '/search-modal', // 검색 모달 경로 추가
    element: <SearchModal />,
  },
  {
    path: '/facility-list', // 시설 목록 경로
    element: <ListPage type="facility" />,
  },
  {
    path: '/pension-list', // 펜션 목록 경로
    element: <PensionListPage />,
  },
  {
    path: '/place/:id', // 장소 상세 페이지 경로
    element: <PlaceDetailPage />,
  },
  {
    path: '/pension-detail/:id', // 펜션 상세 페이지 경로
    element: <PensionDetailPage />
  },
  {
    path: ROUTER_PATHS.LOGIN,
    element: <Login />,
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
    path: ROUTER_PATHS.ALL_REVIEW,
    element: <AllReviews />,
  },
  {
    path: ROUTER_PATHS.REVIEW_ADD,
    element: <ReviewAdd />,
  },
];

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: routes,
  },
]);

export default router;
