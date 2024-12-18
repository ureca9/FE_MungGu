import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import SearchModal from "../../components/MainPage/SearchModal/SearchModal";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import useLoadingStore from "../../stores/common/useLoadingStore";
import Swal from 'sweetalert2';

const PensionListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoading } = useLoadingStore();

  const [pensions, setPensions] = useState([]);
  const [filteredPensions, setFilteredPensions] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = [
    "전체",
    "주차 가능",
    "반려동물 전용",
    "실내공간",
    "실외공간",
    "무게 제한 없음",
    "수영장",
    "바비큐",
    "불멍",
    "울타리 있음",
    "짖음 OK",
    "금연",
  ];

  const fetchMorePensions = async (page = currentPage + 1, currentFilters = filters) => {
    if (isFetching || !hasNext) {
      console.log("Fetch blocked - isFetching:", isFetching, "hasNext:", hasNext);
      return;
    }
  
    console.log("Fetching more pensions...");
    setIsFetching(true);
    setIsLoading(true);
  
    try {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
  
      const response = await axios.get("https://meong9.store/api/v1/search/pensions", {
        params: {
          page: page,
          size: 10,
          searchWord: currentFilters.searchWord || "",
          regionList: currentFilters.regionList || [],
          heaviestDogWeight: currentFilters.heaviestDogWeight || 0,
          startDate: currentFilters.startDate || undefined,
          endDate: currentFilters.endDate || undefined,
        },
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();
          for (const key in params) {
            if (params[key] === undefined || params[key] === "") continue;
            if (Array.isArray(params[key])) {
              searchParams.append(key, params[key].join(","));
            } else {
              searchParams.append(key, params[key]);
            }
          }
          return searchParams.toString();
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      });
  
      const newPensions = response.data.data.pensionInfo || [];
      const nextPageExists = response.data.data.hasNext;
  
      console.log("New pensions:", newPensions, "Has next:", nextPageExists);
  
      setPensions((prevPensions) => {
        const uniquePensions = new Map();
        [...prevPensions, ...newPensions].forEach((item) => {
          uniquePensions.set(item.pensionId, item);
        });
        return Array.from(uniquePensions.values());
      });
  
      setCurrentPage(page);
      setHasNext(nextPageExists);
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  };
  
  const toggleLike = async (pensionId) => {
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      if (!accessToken) {

        const result = await Swal.fire({
          title: '로그인 후 이용해주세요.',
          icon: 'warning',
          showCancelButton: true, 
          confirmButtonText: '로그인',
          cancelButtonText: '취소',
          confirmButtonColor: '#3288FF',
        });
  
        if (result.isConfirmed) {
          navigate('/login');
        }
        return; 
      }
  
      const headers = {
        Accept: 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      };
  
      await axios.post(
        `https://meong9.store/api/v1/pensions/likes/${pensionId}`, // pensionId 사용
        {},
        { headers },
      );
  
      // 찜 상태를 업데이트
      setPensions((prevPensions) =>
        prevPensions.map((pension) =>
          pension.pensionId === pensionId
            ? { ...pension, likeStatus: !pension.likeStatus }
            : pension
        )
      );
    } catch (error) {
      console.error('찜 상태 업데이트 실패:', error);
      Swal.fire({
        title: '찜 상태를 업데이트하는 중 문제가 발생했습니다.',
        icon: 'error',
      });
    }
  };
  
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        if (location.state) {
          setPensions(location.state.results || []);
          setFilters(location.state.filters || {});
          setHasNext(location.state.hasNext ?? true); 
          sessionStorage.setItem(
            "pensionListData",
            JSON.stringify({
              results: location.state.results || [],
              filters: location.state.filters || {},
              hasNext: location.state.hasNext ?? true,
            })
          );
        } else {
          const savedData = sessionStorage.getItem("pensionListData");
          if (savedData) {
            const parsedData = JSON.parse(savedData);
            setPensions(parsedData.results || []);
            setFilters(parsedData.filters || []);
            setHasNext(parsedData.hasNext ?? true); 
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [location.state]);

  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;
      if (bottomReached && !isFetching && hasNext) {
        fetchMorePensions(currentPage + 1, filters);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching, hasNext, currentPage, filters]);
  
  useEffect(() => {
    if (selectedTags.length === 0 || selectedTags.includes("전체")) {
      setFilteredPensions(pensions);
    } else {
      setFilteredPensions(
        pensions.filter(
          (pension) =>
            pension.tags &&
            selectedTags.every((tag) => pension.tags.includes(tag))
        )
      );
    }
  }, [selectedTags, pensions]);

  const toggleTag = (tag) => {
    if (tag === "전체") {
      setSelectedTags(["전체"]);
    } else {
      setSelectedTags((prevTags) =>
        prevTags.includes("전체")
          ? [tag]
          : prevTags.includes(tag)
          ? prevTags.filter((t) => t !== tag)
          : [...prevTags, tag]
      );
    }
  };

  const handlePensionClick = (pensionId) => {
    if (!pensionId) {
      console.error("Invalid pensionId:", pensionId);
      return;
    }
    navigate(`/pension-detail/${pensionId}`);
  };

  const handleSearchComplete = (newResults, newFilters) => {
    setPensions(newResults);
    setFilters(newFilters);
    setCurrentPage(1);
    setHasNext(true);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LoadingSpinner />
  
      {isModalOpen && (
        <SearchModal
          onClose={() => setIsModalOpen(false)}
          onSearchComplete={handleSearchComplete}
        />
      )}
  
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <div
          className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer flex-grow"
          onClick={() => setIsModalOpen(true)}
        >
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="flex-grow text-gray-600 bg-transparent focus:outline-none"
            readOnly
          />
        </div>
      </header>
  
      <div className="flex gap-2 p-4 overflow-x-auto bg-white shadow-sm scrollbar-hidden">
  {tags.map((tag) => (
    <button
      key={tag}
      onClick={() => toggleTag(tag)}
      className={`px-4 py-2 whitespace-nowrap border rounded-full ${
        selectedTags.includes(tag)
          ? "border-blue-500 text-blue-500 font-semibold"
          : "border-gray-300 text-gray-600"
      } hover:bg-gray-100`}
    >
      {tag}
    </button>
  ))}
</div>
  
      <div className="p-4 space-y-4">
        {filteredPensions.length > 0 ? (
          filteredPensions.map((pension) => (
            <div
              key={pension.pensionId}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handlePensionClick(pension.pensionId)}
            >
              <img
                src={pension.images?.[0] || "/placeholder-image.jpg"}
                alt={pension.pensionName || "이미지 없음"}
                className="w-full h-48 sm:h-[250px] object-cover"
              />
  
              <div className="p-4 flex justify-between items-start">
                <div className="flex flex-col space-y-1">
                  <h2 className="text-[14px] sm:text-xl font-bold mb-2 truncate">
                    {pension.pensionName || "이름 없음"}
                  </h2>
                  <p className="text-[10px] sm:text-sm text-gray-500 truncate">
                    {pension.address || "주소 정보 없음"}
                  </p>
  
                  <p className="text-sm text-gray-500 flex sm:hidden flex-col">
                    <span>입실 {pension.startTime || "정보 없음"}</span>
                    <span>퇴실 {pension.endTime || "정보 없음"}</span>
                  </p>
                </div>
  
                <div className="flex flex-col items-end space-y-1 -mt-1">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <span className="text-yellow-500 font-semibold">
                      ⭐ {pension.reviewAvg || "0"}{" "}
                      <span className="text-gray-500 text-sm">
                        ({pension.reviewCount || "0"})
                      </span>
                    </span>
                    <button
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        pension.likeStatus ? "text-red-500" : "text-gray-400"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(pension.pensionId);
                      }}
                    >
                      {pension.likeStatus ? "❤️" : "🤍"}
                    </button>
                  </div>
                  <div className="flex items-baseline space-x-1 flex-nowrap">
  <span className="text-blue-500 font-bold text-lg sm:text-2xl">
    {pension.lowestPrice
      ? `${pension.lowestPrice.toLocaleString()}원`
      : "가격 미정"}
  </span>
  <span className="text-gray-500 text-xs sm:text-sm">
    / 1박
  </span>
</div>

                  <p className="hidden sm:flex text-sm text-gray-500 space-x-1">
                    <span>입실 {pension.startTime || "정보 없음"}</span>
                    <span>~</span>
                    <span>퇴실 {pension.endTime || "정보 없음"}</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">조건에 맞는 펜션이 없습니다.</p>
        )}
      </div>
    </div>
  );
  
  
};

export default PensionListPage;