import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import { useEffect, useState } from 'react';
import { GetMyReviewData } from '../../api/review';
import MyReviewCard from '../../components/review/MyReviewCard';
import { FiSearch } from 'react-icons/fi';
import useMyReviewStore from '../../stores/review/useMyReviewStore';

const MyReview = () => {
  const [inputValue, setInputValue] = useState('');
  const [sortState, setSortState] = useState('none');
  const { myReviews, setMyReviews } = useMyReviewStore();

  const getMyReviewData = async () => {
    try {
      const response = await GetMyReviewData();
      setMyReviews(response.data);
    } catch (error) {
      console.error('내가쓴 리뷰 오류:', error);
    }
  };

  useEffect(() => {
    getMyReviewData();
  }, []);

  const sortReviews = () => {
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
  }, [sortState]);

  const searchReviews = myReviews.filter((myReview) => {
    const { content, plcPenName } = myReview;
    return (
      content.toLowerCase().includes(inputValue.toLowerCase()) ||
      plcPenName.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col w-full h-full gap-3 p-3 md:p-7 min-w-80">
      <div className="flex justify-between w-full mb-5">
        <div className="relative flex w-2/5">
          <input
            type="search"
            placeholder="내용을 작성해 주세요."
            onInput={(e) => setInputValue(e.target.value)}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-[#F5F5F5] h-10 rounded-lg border w-full border-[#B5B5B5] px-5"
          />
          {!inputValue && (
            <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-[#B5B5B5] text-3xl">
              <FiSearch />
            </span>
          )}
        </div>
        <span className="flex flex-row items-center">
          <button
            className={`flex transition duration-300 transform hover:scale-105 items-center gap-1 p-2 mx-2 ${sortState === 'latest' ? 'px-2 py-1 border rounded-lg border-[#8A8A8A]' : ''}`}
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
            className={`flex transition duration-300 transform hover:scale-105 items-center p-2 gap-1 ${sortState === 'oldest' ? 'px-2 py-1 border rounded-lg border-[#8A8A8A]' : ''}`}
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
      {searchReviews.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          작성한 리뷰가 없습니다.
        </div>
      ) : (
        searchReviews.map((myReview, index) => (
          <MyReviewCard
            key={index}
            myReview={myReview}
            myReviews={myReviews}
            setMyReviews={setMyReviews}
          />
        ))
      )}
    </div>
  );
};

export default MyReview;
