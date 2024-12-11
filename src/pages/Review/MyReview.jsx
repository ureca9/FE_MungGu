import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import { useEffect, useState } from 'react';
import { GetMyReviewData } from '../../api/review';
import MyReviewCard from '../../components/review/MyReviewCard';
import { FiSearch } from 'react-icons/fi';

const MyReview = () => {
  const [myReview, setMyReview] = useState();
  useEffect(() => {
    const getMyReviewData = async () => {
      try {
        const response = await GetMyReviewData();
        console.log('내가쓴 리뷰:', response.data);
        setMyReview(response.data);
      } catch (error) {
        console.error('내가쓴 리뷰 오류:', error);
      }
    };

    getMyReviewData();
  }, []);
  const [inputValue, setInputValue] = useState(''); // 입력 값 상태 관리
  return (
    <div className="flex flex-col w-full gap-3 p-7">
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
          <button className="flex items-center gap-1 mx-2">
            최신순
            <span>
              <GoArrowUp />
            </span>
          </button>
          <button className="flex items-center gap-1">
            오래된순
            <span>
              <GoArrowDown />
            </span>
          </button>
        </span>
      </div>
      <MyReviewCard />
    </div>
  );
};

export default MyReview;
