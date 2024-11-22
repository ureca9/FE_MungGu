import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout.jsx';
import Main from '../pages/Main.jsx';
import Like from '../pages/Like.jsx';
import Map from '../pages/Map.jsx';
import MyPage from '../pages/UserPage/MyPage.jsx';
import Search from '../pages/Search.jsx';
import UserUpdatePage from '../pages/UserPage/UserUpdatePage.jsx';
import PetUpdatePage from '../pages/PetPage/PetUpdatePage.jsx';
import PlaceDetailPage from '../pages/DetailPage/PlaceDetailPage.jsx';
import SearchModal from "../components/MainPage/SearchModal/SearchModal.jsx";
import ListPage from '../pages/ListPage/ListPage.jsx'; // ListPage 경로 확인
import PensionListPage from '../pages/ListPage/PensionListPage.jsx';
import PensionDetailPage from '../pages/DetailPage/PensionDetailPage.jsx';

const routes = [
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/like',
    element: <Like />,
  },
  {
    path: '/map',
    element: <Map />,
  },
  {
    path: '/my-page',
    element: <MyPage />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/user-update',
    element: <UserUpdatePage />,
  },
  {
    path: '/pet-update',
    element: <PetUpdatePage />,
  },
  {
    path: "/search-modal", // 검색 모달 경로 추가
    element: <SearchModal />,
  },
  {
    path: "/facility-list", // 시설 목록 경로
    element: <ListPage type="facility" />,
  },
  {
    path: "/pension-list", // 펜션 목록 경로
    element: <PensionListPage />,
  },
  {
    path: "/place/:id", // 장소 상세 페이지 경로
    element: <PlaceDetailPage />,
  },
  {
    path: "/pension-detail/:id", // 펜션 상세 페이지 경로
    element: <PensionDetailPage />,
  },
];

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: routes,
  },
]);

export default router;
