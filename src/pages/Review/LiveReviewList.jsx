import ReviewCard from '../../components/review/ReviewCard';

const LiveReviewList = () => {
  return (
    <div className="flex flex-col min-w-96 sm:w-full">
      <h1>실시간 리뷰</h1>
      <div className="h-2 mt-1 mb-5 bg-[#D9D9D9]"></div>
      <div className="flex flex-col gap-3 px-2 min-w-96 sm:w-full sm:px-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          reviews.map((review, index) => (
            <div key={index}>
              <ReviewCard key={index} review={review} />
              <div className="mt-3 h-1 bg-[#D9D9D9] "></div>
            </div>
          ))
        )}
        {isLoading && <div>Loading...</div>}
        <div ref={ref} className="h-4 root"></div>
      </div>
    </div>
  );
};

export default LiveReviewList;
