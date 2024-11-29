import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout.jsx';
import Main from '../pages/Main.jsx';
import Like from '../pages/Like.jsx';
import Map from '../pages/Map.jsx';
import MyPage from '../pages/UserPage/MyPage.jsx';
import Search from '../pages/Search.jsx';
import UserUpdatePage from '../pages/UserPage/UserUpdatePage.jsx';
import PetUpdatePage from '../pages/PetPage/PetUpdatePage.jsx';
<<<<<<< HEAD
import PlaceDetailPage from '../pages/DetailPage/PlaceDetailPage.jsx';
import SearchModal from '../components/MainPage/SearchModal/SearchModal.jsx';
import ListPage from '../pages/ListPage/ListPage.jsx'; // ListPage 경로 확인
import PensionListPage from '../pages/ListPage/PensionListPage.jsx';
import PensionDetailPage from '../pages/DetailPage/PensionDetailPage.jsx';
import Test from '../pages/Test.jsx';
=======
import Login from '../pages/Login.jsx';
import ROUTER_PATHS from '../utils/RouterPath.js';
import Meongsengneacut from '../pages/Meongsengneacut.jsx';
>>>>>>> f9ddb28a09dd76610f5d097851668f0d04c5391b

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
    path: ROUTER_PATHS.MY_PAGE,
    element: <MyPage />,
  },
  {
    path: ROUTER_PATHS.SEARCH,
    element: <Search />,
  },
  {
    path: ROUTER_PATHS.USER_UPDATE,
    element: <UserUpdatePage />,
  },
  {
    path: ROUTER_PATHS.PET_UPDATE,
    element: <PetUpdatePage />,
  },
  {
<<<<<<< HEAD
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
    path: '/test',
    element: <Test />,
=======
    path: ROUTER_PATHS.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTER_PATHS.MEONGSENGNEACUT,
    element: <Meongsengneacut />,
>>>>>>> f9ddb28a09dd76610f5d097851668f0d04c5391b
  },
];
const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: routes,
  },
]);

export default router;
