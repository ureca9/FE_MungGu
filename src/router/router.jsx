import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout.jsx';
import Main from '../pages/Main.jsx';
import Like from '../pages/Like.jsx';
import Map from '../pages/Map.jsx';
import MyPage from '../pages/UserPage/MyPage.jsx';
import Search from '../pages/Search.jsx';
import PetForm from '../pages/PetPage/PetForm.jsx';
import PetAdd from '../pages/PetPage/PetAdd.jsx';
import PetEdit from '../pages/PetPage/PetEdit.jsx';
import UserEdit from '../pages/UserPage/UserEdit.jsx';
import Login from '../pages/Login.jsx';
import ROUTER_PATHS from '../utils/RouterPath.js';
import Meongsengneacut from '../pages/Meongsengneacut.jsx';
import PetRegister from '../pages/PetPage/PetRegister.jsx';

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
    path: '/user-edit',
    element: <UserEdit />,
  },
  {
    path: '/pet-form',
    element: <PetForm />,
  },
  {
    path: '/pet-register',
    element: <PetRegister />,
  },
  {
    path: '/pet-add',
    element: <PetAdd />,
  },
  {
    path: '/pet-edit/:puppyId',
    element: <PetEdit />,
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
