import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout.jsx';
import Main from '../pages/Main.jsx';
import Like from '../pages/Like.jsx';
import Map from '../pages/Map/Map.jsx';
import MyPage from '../pages/UserPage/MyPage.jsx';
import Search from '../pages/Search.jsx';
import UserUpdatePage from '../pages/UserPage/UserUpdatePage.jsx';
import PetUpdatePage from '../pages/PetPage/PetUpdatePage.jsx';
import MapSearch from '../pages/Map/MapSearch.jsx';
import Directions from '../pages/Map/Directions.jsx';
import Login from '../pages/Login.jsx';
import ROUTER_PATHS from '../utils/RouterPath.js';
import Meongsengneacut from '../pages/Meongsengneacut.jsx';

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
    path: '/map-search',
    element: <MapSearch />,
  },
  {
    path: '/directions',
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
    path: ROUTER_PATHS.USER_UPDATE,
    element: <UserUpdatePage />,
  },
  {
    path: ROUTER_PATHS.PET_UPDATE,
    element: <PetUpdatePage />,
  },
  {
    path: ROUTER_PATHS.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTER_PATHS.MEONGSENGNEACUT,
    element: <Meongsengneacut />,
  },
];

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: routes,
  },
]);

export default router;
