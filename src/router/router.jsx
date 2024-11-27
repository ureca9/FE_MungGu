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
import Test from '../pages/Test.jsx';
import Directions from '../pages/Map/Directions.jsx';

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
    path: '/map-search',
    element: <MapSearch />,
  },
  {
    path: '/directions',
    element: <Directions />,
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
    path: '/test',
    element: <Test />,
  },
];

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: routes,
  },
]);

export default router;
