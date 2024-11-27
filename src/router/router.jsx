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
import Test from '../pages/Test.jsx';
import PetRegister from '../pages/PetPage/PetRegister.jsx';

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
    path: '/pet-edit',
    element: <PetEdit />,
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
