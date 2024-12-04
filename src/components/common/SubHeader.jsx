import { IoIosArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import ROUTER_PATHS from '../../utils/RouterPath';

const SubHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const PAGE_TITLES = {
    [ROUTER_PATHS.MAP]: '강아지도',
    [ROUTER_PATHS.MY_PAGE]: '마이페이지',
    [ROUTER_PATHS.LOGIN]: '로그인',
    [ROUTER_PATHS.LIVE_REVIEW]: '실시간 리뷰',
    [ROUTER_PATHS.USER_REGISTER]: '회원 등록',
    [ROUTER_PATHS.PET_REGISTER]: '강아지 등록',
    [ROUTER_PATHS.PREFERENCE_PLANT]: '선호 시설 등록',
    [ROUTER_PATHS.PREFERENCE_REGION]: '선호 지역 등록',
    [ROUTER_PATHS.REGION_NAME]: '지역명',
    [ROUTER_PATHS.PLACE_NAME]: '장소명',
    [ROUTER_PATHS.ALL_REVIEW]: '리뷰 전체보기',
    [ROUTER_PATHS.PET_EDIT_ID]: '강아지 수정',
    [ROUTER_PATHS.PET_ADD]: '강아지 추가',
    [ROUTER_PATHS.USER_UPDATE]: '회원 정보 수정',
    [ROUTER_PATHS.MY_REVIEW]: '내가 쓴 후기',
    [ROUTER_PATHS.MY_REVIEW_MODIFY]: '후기 수정',
    [ROUTER_PATHS.RECENT_VIEW_LIST]: '최근 본 목록',
    [ROUTER_PATHS.RESERVATION]: '예약',
    [ROUTER_PATHS.RESERVATION_COMPLETE]: '예약완료',
    [ROUTER_PATHS.RESERVATION_LIST]: '예약 내역',
    [ROUTER_PATHS.MEONGSENGNEACUT]: '멍생네컷',
  };

  const pageTitle = PAGE_TITLES[location.pathname] || '페이지 없음';

  return (
    <header className="fixed top-0 z-10 w-[768px] border-b border-gray-300 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <button onClick={() => navigate(-1)} className="text-xl">
          <IoIosArrowBack />
        </button>
        <div className="text-xl font-bold">{pageTitle}</div>
        <div className="w-5"></div>
      </div>
    </header>
  );
};

export default SubHeader;
