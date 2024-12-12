import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import { useEffect, useRef, useState } from 'react';
import { GetMyReviewData } from '../../api/review';
import MyReviewCard from '../../components/review/MyReviewCard';
import { FiSearch } from 'react-icons/fi';

const MyReview = () => {
  const [myReviews, setMyReviews] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sortState, setSortState] = useState('none'); // 정렬 상태 추가
  const myReviewRef = useRef(null)

  const getMyReviewData = async () => {
    try {
      const response = await GetMyReviewData();
      console.log('내가쓴 리뷰:', response.data);
      setMyReviews(response.data);
    } catch (error) {
      console.error('내가쓴 리뷰 오류:', error);
    }
  };

  useEffect(() => {
    getMyReviewData();
  }, []);

  const handleReviewDataUpdate = () => {
    getMyReviewData();
  };

  const sortReviews = () => {
    // 정렬 함수
    const sortedReviews = [...myReviews];
    sortedReviews.sort((a, b) => {
      const dateA = new Date(a.visitDate);
      const dateB = new Date(b.visitDate);

      if (sortState === 'latest') {
        return dateB - dateA;
      } else if (sortState === 'oldest') {
        return dateA - dateB;
      } else {
        return 0;
      }
    });

    setMyReviews(sortedReviews);
  };

  useEffect(() => {
    sortReviews();
  }, [sortState]); // sortState 변경 시 sortReviews 호출

  return (
    <div className="flex flex-col w-full h-full gap-3 p-7 " ref={myReviewRef}>
      <div className="flex justify-between mb-5">
        <div className="relative flex w-1/3">
          <input
            type="search"
            placeholder="내용을 작성해 주세요."
            onInput={(e) => setInputValue(e.target.value)}
            className="bg-[#F5F5F5] h-10 rounded-lg border border-[#B5B5B5] px-5"
          />
          {!inputValue && (
            <span className="absolute -right-5 top-1/2 transform -translate-y-1/2 text-[#B5B5B5] text-3xl">
              <FiSearch />
            </span>
          )}
        </div>
        <span className="flex flex-row items-center">
          <button
            className={`flex items-center gap-1 mx-2 ${sortState === 'latest' ? 'border-b-2 border-black' : ''}`}
            onClick={() => {
              setSortState('latest');
              sortReviews();
            }}
          >
            최신순
            <span>
              <GoArrowUp />
            </span>
          </button>
          <button
            className={`flex items-center gap-1 ${sortState === 'oldest' ? 'border-b-2 border-black' : ''}`}
            onClick={() => {
              setSortState('oldest');
              sortReviews();
            }}
          >
            오래된순
            <span>
              <GoArrowDown />
            </span>
          </button>
        </span>
      </div>
      {myReviews.length === 0 ? ( // myReviews가 비어있는지 확인
        <div className="flex items-center justify-center h-full">
          작성한 리뷰가 없습니다.
        </div>
      ) : (
        myReviews.map((myReview, index) => (
          <MyReviewCard key={index} myReview={myReview} />
        ))
      )}
    </div>
  );
};

export default MyReview;
