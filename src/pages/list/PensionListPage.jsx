import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchPensions } from '../../api/list-page/pension-list-page';
import FilterTags from '../../components/list-page/FilterTags';
import PensionList from '../../components/list-page/PensionList';
import SearchBar from '../../components/list-page/SearchBar';
import SearchModal from '../../components/main-page/search-modal/SearchModal';

const PensionListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [pensions, setPensions] = useState([]);
  const [filteredPensions, setFilteredPensions] = useState([]);
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
        };
        setPensions(location.state.results || []);
        setFilters(initialFilters);
        sessionStorage.setItem(
          'pensionListData',
          JSON.stringify({
            results: location.state.results || [],
            filters: initialFilters,
          })
        );
      } else {
        const savedData = JSON.parse(sessionStorage.getItem('pensionListData'));
        if (savedData) {
          setPensions(savedData.results || []);
          setFilters(savedData.filters || {});
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
        fetchMorePensions(currentPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filters, hasNext, currentPage]);

  useEffect(() => {
    if (selectedTags.length === 0 || selectedTags.includes('전체')) {
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

  const fetchMorePensions = async (page) => {
    if (isFetchingRef.current || !hasNext) return;
    setIsFetching(true);
    try {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');
      const data = await fetchPensions(page, filters, accessToken);
      setPensions((prev) => [...prev, ...data.pensionInfo]);
      setCurrentPage(page);
      setHasNext(data.hasNext);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsFetching(false);
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
        Authorization: `Bearer ${accessToken}`,
      };
  
      await fetch(`https://meong9.store/api/v1/pensions/likes/${pensionId}`, {
        method: 'POST',
        headers,
      });
  
      setPensions((prevPensions) =>
        prevPensions.map((pension) =>
          pension.pensionId === pensionId
            ? { ...pension, likeStatus: !pension.likeStatus }
            : pension
        )
      );
    } catch (error) {
      console.error('찜 상태 업데이트 실패:', error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchBar onOpenModal={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <SearchModal onClose={() => setIsModalOpen(false)} filters={filters} />
      )}
      <FilterTags tags={selectedTags} onToggleTag={setSelectedTags} />
      <PensionList 
  pensions={filteredPensions} 
  onPensionClick={(id) => navigate(`/pension-detail/${id}`)} 
  onToggleLike={toggleLike} 
/>
    </div>
  );
};

export default PensionListPage;
