import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout.jsx';
import Main from '../pages/Main.jsx';
import Like from '../pages/Like.jsx';
import Map from '../pages/Map.jsx';
import MyPage from '../pages/UserPage/MyPage.jsx';
import Search from '../pages/Search.jsx';
import UserUpdatePage from '../pages/UserPage/UserUpdatePage.jsx';
import PetUpdatePage from '../pages/PetPage/PetUpdatePage.jsx';

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
];

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: routes,
  },
]);

export default router;
