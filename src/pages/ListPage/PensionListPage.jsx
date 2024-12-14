import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import SearchModal from "../../components/MainPage/SearchModal/SearchModal";

const PensionListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [pensions, setPensions] = useState([]); // 펜션 데이터
  const [filters, setFilters] = useState({}); // 필터 조건
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [isFetching, setIsFetching] = useState(false); // 데이터 로딩 상태
  const [hasNext, setHasNext] = useState(true); // 추가 데이터 유무
  const [isModalOpen, setIsModalOpen] = useState(false); // 검색 모달 상태

  // 무한 스크롤 데이터 요청 함수
  const fetchMorePensions = useCallback(async () => {
    if (isFetching || !hasNext) return;

    setIsFetching(true);
    try {
      const response = await axios.get("https://meong9.store/api/v1/search/pensions", {
        params: {
          page: currentPage + 1,
          size: 10,
          searchWord: filters.searchWord || "",
          regionList: filters.regionList || [],
          heaviestDogWeight: filters.heaviestDogWeight || 0,
          startDate: filters.startDate || undefined,
          endDate: filters.endDate || undefined,
        },
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();
          for (const key in params) {
            if (params[key] === undefined || params[key] === "") continue;
            if (Array.isArray(params[key])) {
              params[key].forEach((value) =>
                searchParams.append(`${key}[]`, value)
              );
            } else {
              searchParams.append(key, params[key]);
            }
          }
          return searchParams.toString();
        },
      });

      const newPensions = response.data.data.pensionInfo;

      setPensions((prevPensions) => {
        const uniquePensions = new Map();
        [...prevPensions, ...newPensions].forEach((item) => {
          uniquePensions.set(item.pensionId, item);
        });
        return Array.from(uniquePensions.values());
      });

      setCurrentPage((prevPage) => prevPage + 1);
      setHasNext(newPensions.length > 0);
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setIsFetching(false);
    }
  }, [currentPage, filters, hasNext, isFetching]);

  // 초기 데이터 설정
  useEffect(() => {
    if (location.state) {
      setPensions(location.state.results || []);
      setFilters(location.state.filters || {});
      sessionStorage.setItem(
        "pensionListData",
        JSON.stringify({
          results: location.state.results || [],
          filters: location.state.filters || {},
        })
      );
    } else {
      const savedData = sessionStorage.getItem("pensionListData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setPensions(parsedData.results || []);
        setFilters(parsedData.filters || {});
      }
    }
  }, [location.state]);

  // 무한 스크롤 구현
  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;

      if (bottomReached && !isFetching && hasNext) {
        fetchMorePensions();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching, hasNext, fetchMorePensions]);

  const handlePensionClick = (pensionId) => {
    if (!pensionId) {
      console.error("Invalid pensionId:", pensionId);
      return;
    }
    navigate(`/pension-detail/${pensionId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isModalOpen && <SearchModal onClose={() => setIsModalOpen(false)} />}

      <header className="bg-white shadow-md p-4 flex items-center justify-between">


        <div className="w-6"></div>
      </header>

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

      <div className="p-4 space-y-4">
        {pensions.length > 0 ? (
          pensions.map((pension) => (
            <div
              key={pension.pensionId}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handlePensionClick(pension.pensionId)}
            >
              <img
                src={pension.images?.[0] || "/placeholder-image.jpg"}
                alt={pension.pensionName || "이미지 없음"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{pension.pensionName}</h2>
                <p className="text-sm text-gray-500">
                  {pension.address || "주소 정보 없음"}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-yellow-500 font-semibold">
                    ⭐ {pension.reviewAvg || "0"} ({pension.reviewCount || "0"})
                  </span>
                  <span className="text-blue-500 font-semibold">
                    {pension.lowestPrice || "가격 미정"} / 1박
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">조건에 맞는 펜션이 없습니다.</p>
        )}
      </div>

      {isFetching && <p className="text-center text-gray-500">로딩 중...</p>}
    </div>
  );
};

export default PensionListPage;