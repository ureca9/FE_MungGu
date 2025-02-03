import { createBrowserRouter } from 'react-router-dom';
import ROUTER_PATHS from '../utils/RouterPath.js';
import DefaultLayout from '../layout/DefaultLayout.jsx';
import Main from '../pages/Main.jsx';
import Map from '../pages/map/Map.jsx';
import MyPage from '../pages/user/MyPage.jsx';
import Search from '../pages/Search.jsx';
import PetAdd from '../pages/pet/PetAdd.jsx';
import PetEdit from '../pages/pet/PetEdit.jsx';
import UserEdit from '../pages/user/UserEdit.jsx';
import MapSearch from '../pages/map/MapSearch.jsx';
import Directions from '../pages/map/Directions.jsx';
import PlaceDetailPage from '../pages/detail/PlaceDetailPage.jsx';
import SearchModal from '../components/main-page/search-modal/SearchModal.jsx';
import ListPage from '../pages/list/ListPage.jsx';
import PensionListPage from '../pages/list/PensionListPage.jsx';
import PensionDetailPage from '../pages/detail/PensionDetailPage.jsx';
import Login from '../pages/Login.jsx';
import UserRegister from '../pages/user/UserRegister';
import PetRegister from '../pages/pet/PetRegister.jsx';
import PreferencePlant from '../pages/user/PreferencePlant.jsx';
import PreferenceRegion from '../pages/user/PreferenceRegion.jsx';
import PlantEdit from '../pages/user/PlantEdit.jsx';
import RegionEdit from '../pages/user/RegionEdit.jsx';
import MapSearchResults from '../pages/map/MapSearchResults.jsx';
import ReviewAdd from '../pages/review/ReviewAdd.jsx';
import Mungsengneacut from '../pages/mungsengneacut/Mungsengneacut.jsx';
import ChooseFrame from '../pages/mungsengneacut/ChooseFrame.jsx';
import UploadPhotos from '../pages/mungsengneacut/UploadPhotos.jsx';
import DownloadPhotos from '../pages/mungsengneacut/DownloadPhoto.jsx';
import MyReview from '../pages/review/MyReview.jsx';
import ReviewEdit from '../pages/review/ReviewEdit.jsx';
import PensionAllReview from '../pages/review/PensionAllReview.jsx';
import PlaceAllReview from '../pages/review/PlaceAllReview.jsx';
import ViewHistory from '../pages/review/ViewHistory.jsx';

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
    path: ROUTER_PATHS.MAP_SEARCH_RESULTS,
    element: <MapSearchResults />,
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
    path: ROUTER_PATHS.MUNGSENGNEACUT,
    element: <Mungsengneacut />,
  },
  {
    path: ROUTER_PATHS.CHOOSE_FRAME,
    element: <ChooseFrame />,
  },
  {
    path: ROUTER_PATHS.UPLOAD_PHOTOS,
    element: <UploadPhotos />,
  },
  {
    path: ROUTER_PATHS.DOWNLOAD_PHOTOS,
    element: <DownloadPhotos />,
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
  {
    path: ROUTER_PATHS.VIEW_HISTORY,
    element: <ViewHistory />,
  },
];

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: routes,
  },
]);

export default router;
