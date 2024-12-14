import { IoIosArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import ROUTER_PATHS from '../../utils/RouterPath';
import usePlaceStore from '../../stores/map/usePlaceStore.js';

const SubHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const PAGE_TITLES = {
    [ROUTER_PATHS.MAP]: '강아지도',
    [ROUTER_PATHS.MAP_SEARCH]: '지도 검색',
    [ROUTER_PATHS.DIRECTIONS]: '', // 수정 필요
    [ROUTER_PATHS.MY_PAGE]: '마이페이지',
    [ROUTER_PATHS.LOGIN]: '로그인',
    [ROUTER_PATHS.SEARCH]: '검색',
    [ROUTER_PATHS.LIVE_REVIEW]: '실시간 리뷰',
    [ROUTER_PATHS.USER_REGISTER]: '회원 정보 입력',
    [ROUTER_PATHS.PET_REGISTER]: '강아지 정보 입력',
    [ROUTER_PATHS.PREFERENCE_PLANT]: '선호 시설 선택',
    [ROUTER_PATHS.PREFERENCE_REGION]: '선호 지역 선택',
    [ROUTER_PATHS.REGION_NAME]: '지역명', // 해당 지역으로 수정 필요
    [ROUTER_PATHS.PLACE_NAME]: '장소명', // 해당 장소로 수정 필요
    [ROUTER_PATHS.ALL_REVIEW]: '리뷰 전체보기',
    [ROUTER_PATHS.PET_EDIT_ID]: '강아지 수정',
    [ROUTER_PATHS.PET_ADD]: '강아지 추가',
    [ROUTER_PATHS.USER_EDIT]: '회원 정보 수정',
    [ROUTER_PATHS.PLANT_EDIT]: '선호 시설 수정',
    [ROUTER_PATHS.REGION_EDIT]: '선호 지역 수정',
    [ROUTER_PATHS.MY_REVIEW]: '내가 쓴 후기',
    [ROUTER_PATHS.MY_REVIEW_MODIFY]: '후기 수정',
    [ROUTER_PATHS.RECENT_VIEW_LIST]: '최근 본 목록',
    [ROUTER_PATHS.MEONGSENGNEACUT]: '멍생네컷',
    [ROUTER_PATHS.SEARCH_MODAL]: '검색', // 수정 필요
    [ROUTER_PATHS.FACILITY_LIST]: '시설 목록', // 수정 필요
    [ROUTER_PATHS.PENSION_LIST]: '펜션 목록', // 수정 필요
    [ROUTER_PATHS.PLACE_DETAIL]: '시설 상세',
    [ROUTER_PATHS.PENSION_DETAIL]: '펜션 상세',
    [ROUTER_PATHS.REVIEW_ADD]: '후기 작성',
  };

  const pageTitle = PAGE_TITLES[location.pathname] || '페이지 없음';
  const { setSelectedPlace, setSearchResults } = usePlaceStore();
  const handleBackClick = () => {
    setSelectedPlace(null);
    setSearchResults([]);
  };

  return (
    <header className="fixed top-0 z-10 w-full backdrop-blur-md max-w-[768px]">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <button
          onClick={() => {
            navigate(-1);
            handleBackClick();
          }}
          className="text-xl"
        >
          <IoIosArrowBack />
        </button>
        <div className="text-xl font-bold">{pageTitle}</div>
        <div className="w-5"></div>
      </div>
    </header>
  );
};

export default SubHeader;
