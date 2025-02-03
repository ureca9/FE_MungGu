import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchPlaces } from '../../api/list-page/list-page';
import FilterTags from '../../components/list-page/FilterTags';
import PlaceList from '../../components/list-page/PlaceList';
import SearchBar from '../../components/list-page/SearchBar';
import SearchModal from '../../components/main-page/search-modal/SearchModal';

const ListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const isFetchingRef = useRef(isFetching);

  useEffect(() => {
    const initializeFilters = () => {
      if (location.state) {
        const initialFilters = {
          ...location.state.filters,
          regionList: location.state.filters.regionList?.includes('전체')
            ? []
            : location.state.filters.regionList || [],
          placeTypes: location.state.filters.placeTypes?.includes('전체')
            ? []
            : location.state.filters.placeTypes || [],
        };
        setResults(location.state.results || []);
        setFilters(initialFilters);
        sessionStorage.setItem(
          'facilityListData',
          JSON.stringify({
            results: location.state.results || [],
            filters: initialFilters,
          })
        );
      } else {
        const savedData = JSON.parse(sessionStorage.getItem('facilityListData'));
        if (savedData) {
          const savedFilters = {
            ...savedData.filters,
            regionList: savedData.filters.regionList?.includes('전체')
              ? []
              : savedData.filters.regionList || [],
            placeTypes: savedData.filters.placeTypes?.includes('전체')
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
    setCurrentPage(0);
    setHasNext(true);
  }, [location.state]);

  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;

      if (bottomReached && !isFetchingRef.current && hasNext) {
        fetchMoreData(currentPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filters, hasNext, currentPage]);

  useEffect(() => {
    if (selectedTags.length === 0 || selectedTags.includes('전체')) {
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
  }, [selectedTags, results]);

  const fetchMoreData = async (page) => {
    if (isFetchingRef.current || !hasNext) return;
    setIsFetching(true);
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      const data = await fetchPlaces(page, filters, accessToken);
      setResults((prev) => [...prev, ...data.placeInfo]);
      setCurrentPage(page);
      setHasNext(data.hasNext);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchBar onOpenModal={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <SearchModal onClose={() => setIsModalOpen(false)} filters={filters} />
      )}
      <FilterTags tags={selectedTags} onToggleTag={setSelectedTags} />
      <PlaceList
        results={filteredResults}
        onCardClick={(id) => navigate(`/place/${id}`)}
      />
    </div>
  );
};

export default ListPage;
