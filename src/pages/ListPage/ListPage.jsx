import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import SearchModal from "../../components/MainPage/SearchModal/SearchModal";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const ListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 상태
  const [results, setResults] = useState([]); // 전체 데이터
  const [filters, setFilters] = useState({}); // 검색 필터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [isFetching, setIsFetching] = useState(false); // 데이터 요청 중인지 확인
  const [hasNext, setHasNext] = useState(true); // 다음 데이터가 있는지 확인
  const [isModalOpen, setIsModalOpen] = useState(false); // 검색 모달 상태

  const isFetchingRef = useRef(isFetching);

  // 최신 `isFetching` 상태 동기화
  useEffect(() => {
    isFetchingRef.current = isFetching;
  }, [isFetching]);

  // 초기 데이터 설정
  useEffect(() => {
    const initializeFilters = () => {
      if (location.state) {
        const initialFilters = {
          ...location.state.filters,
          regionList: location.state.filters.regionList?.includes("전체")
            ? []
            : location.state.filters.regionList || [],
          placeTypes: location.state.filters.placeTypes?.includes("전체")
            ? []
            : location.state.filters.placeTypes || [],
        };
        setResults(location.state.results || []);
        setFilters(initialFilters);
        sessionStorage.setItem(
          "facilityListData",
          JSON.stringify({
            results: location.state.results || [],
            filters: initialFilters,
          })
        );
      } else {
        const savedData = JSON.parse(sessionStorage.getItem("facilityListData"));
        if (savedData) {
          const savedFilters = {
            ...savedData.filters,
            regionList: savedData.filters.regionList?.includes("전체")
              ? []
              : savedData.filters.regionList || [],
            placeTypes: savedData.filters.placeTypes?.includes("전체")
              ? []
              : savedData.filters.placeTypes || [],
          };
          setResults(savedData.results || []);
          setFilters(savedFilters);
        }
      }
    };

    initializeFilters();
    setIsFetching(false); // 초기화 후 fetch 상태 초기화
  }, [location.state]);

  // 무한 스크롤 구현
  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;

      if (bottomReached && !isFetchingRef.current && hasNext) {
        fetchMoreData(filters);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [filters, hasNext]);

  // 추가 데이터 요청
  const fetchMoreData = async (currentFilters = filters) => {
    if (isFetchingRef.current || !hasNext) return;

    setIsFetching(true);
    try {
      const params = {
        page: currentPage + 1,
        size: 10,
        searchWord: currentFilters.searchWord || "",
        regionList: currentFilters.regionList?.includes("전체")
          ? []
          : currentFilters.regionList || [],
        placeTypes: currentFilters.placeTypes?.includes("전체")
          ? []
          : currentFilters.placeTypes || [],
        heaviestDogWeight: currentFilters.heaviestDogWeight || 0,
      };

      const response = await axios.get("https://meong9.store/api/v1/search/places", {
        params,
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();
          for (const key in params) {
            if (Array.isArray(params[key])) {
              params[key].forEach((value) => searchParams.append(`${key}[]`, value));
            } else {
              searchParams.append(key, params[key]);
            }
          }
          return searchParams.toString();
        },
      });

      const newResults = response.data.data.placeInfo;

      setResults((prevResults) => {
        const uniqueResults = new Map();
        [...prevResults, ...newResults].forEach((item) => {
          uniqueResults.set(item.placeId, item);
        });
        return Array.from(uniqueResults.values());
      });

      setCurrentPage((prevPage) => prevPage + 1);
      setHasNext(response.data.data.hasNext);
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setIsFetching(false);
    }
  };

  // 시설 클릭 핸들러
  const handlePlaceClick = (placeId) => {
    navigate(`/place/${placeId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 검색 모달 */}
      {isModalOpen && <SearchModal onClose={() => setIsModalOpen(false)} />}

      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-gray-600 text-lg">{`<`}</button>
        <h1 className="text-xl font-bold">시설 목록</h1>
        <div className="w-6"></div>
      </header>

      {/* 검색 버튼 */}
      <div className="p-4 bg-white shadow-sm">
        <div
          className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="flex-grow text-gray-600"
            readOnly
          />
        </div>
      </div>

      {/* 시설 목록 */}
      <div className="p-4 space-y-4">
        {results.length > 0 ? (
          results.map((item, index) => (
            <div
              key={`${item.placeId}-${index}`}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handlePlaceClick(item.placeId)}
            >
              <img
                src={item.images?.[0] || "/default-image.jpg"}
                alt={item.placeName || "이미지 없음"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{item.placeName}</h2>
                <p className="text-sm text-gray-500">{item.address || "주소 정보 없음"}</p>
                <p className="text-sm text-gray-500">
                  {item.businessHour || "운영 시간 정보 없음"}
                </p>
                <p className="text-sm text-gray-500">
                  평균 평점: {item.reviewAvg || "0"} ({item.reviewCount || "0"} 리뷰)
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">조건에 맞는 시설이 없습니다.</p>
        )}
      </div>

      {/* 로딩 표시 */}
      {isFetching && (
        <div className="text-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default ListPage;
