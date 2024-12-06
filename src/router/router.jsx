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
import Login from '../pages/Login.jsx';
import Meongsengneacut from '../pages/Meongsengneacut.jsx';
import UserRegister from './../pages/UserPage/UserRegister';
import PetRegister from '../pages/PetPage/PetRegister.jsx';
import PreferencePlant from '../pages/UserPage/PreferencePlant.jsx';
import PreferenceRegion from '../pages/UserPage/PreferenceRegion.jsx';

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
];

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: routes,
  },
]);

export default router;
