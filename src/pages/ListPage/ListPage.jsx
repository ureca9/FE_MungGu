import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import SearchModal from "../../components/MainPage/SearchModal/SearchModal";
import SubHeader from "../../components/common/SubHeader";

const ListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]); // 필터링된 결과 상태 추가
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]); // 선택된 태그 상태 추가

  const isFetchingRef = useRef(isFetching);

  const tags = [
    "전체",
    "주차 가능",
    "실내 공간",
    "실외 공간",
    "반려동물 전용",
    "수영장",
    "바비큐",
    "금연",
    "무게 제한 없음",
  ]; // 필터 태그 배열

  useEffect(() => {
    isFetchingRef.current = isFetching;
  }, [isFetching]);

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
    setIsFetching(false);
    setCurrentPage(1);
    setHasNext(true);
  }, [location.state]);

  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;

      if (bottomReached && !isFetchingRef.current && hasNext) {
        fetchMoreData(currentPage + 1, filters);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [filters, hasNext, currentPage]);

  useEffect(() => {
    if (selectedTags.length === 0 || selectedTags.includes("전체")) {
      setFilteredResults(results);
    } else {
      setFilteredResults(
        results.filter(
          (result) =>
            result.tags &&
            selectedTags.every((tag) => result.tags.includes(tag))
        )
      );
    }
  }, [selectedTags, results]); // 선택된 태그와 결과 변경 시 필터링

  const fetchMoreData = async (page, currentFilters = filters) => {
    if (isFetchingRef.current || !hasNext) return;

    setIsFetching(true);
    try {
      const params = {
        page,
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

      const accessToken = localStorage.getItem("ACCESS_TOKEN");

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      };

      const response = await axios.get("https://meong9.store/api/v1/search/places", {
        params,
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();
          for (const key in params) {
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
        headers,
      });

      const newResults = response.data.data.placeInfo;
      setResults((prevResults) => {
        const uniqueResults = new Map();
        [...prevResults, ...newResults].forEach((item) => {
          uniqueResults.set(item.placeId, item);
        });
        return Array.from(uniqueResults.values());
      });

      setCurrentPage(page);
      setHasNext(response.data.data.hasNext);

      // 필터링된 결과도 업데이트
      if (selectedTags.length === 0 || selectedTags.includes("전체")) {
        setFilteredResults((prevFilteredResults) => [
          ...prevFilteredResults,
          ...newResults,
        ]);
      } else {
        setFilteredResults((prevFilteredResults) => [
          ...prevFilteredResults,
          ...newResults.filter((result) =>
            selectedTags.every((tag) => result.tags.includes(tag))
          ),
        ]);
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setIsFetching(false);
    }
  };

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

  const handleCardClick = (placeId) => {
    navigate(`/place/${placeId}`);
  };

  const pageTitle = filters.searchWord || location.state?.pageTitle || "장소 목록";

  return (
    <div className="min-h-screen bg-gray-50">
      <SubHeader title={pageTitle} />

      <div className="p-4 bg-white shadow-md mt-16">
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M16.5 9.75a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0z"
            />
          </svg>
        </div>
      </div>

      {isModalOpen && (
        <SearchModal onClose={() => setIsModalOpen(false)} filters={filters} />
      )}

      <div className="flex gap-2 p-4 overflow-x-auto bg-white shadow-sm scrollbar-thin scrollbar-thumb-[#3288ff] scrollbar-track-gray-200">
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
        {filteredResults.length > 0 ? (
          filteredResults.map((item) => (
            <div
              key={item.placeId}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleCardClick(item.placeId)}
            >
              <img
                src={item.images?.[0] || "/default-image.jpg"}
                alt={item.placeName || "이미지 없음"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 relative">
                <h2 className="text-lg font-bold">{item.placeName}</h2>
                <p className="text-sm text-gray-500">{item.address || "주소 정보 없음"}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">조건에 맞는 시설이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ListPage;
