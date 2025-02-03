const PlaceReviewSection = ({ photoReviewList, review, onReviewClick, emptyIcon, onViewAllClick }) => {
  return (
    <section className="p-4 mt-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">리얼 리뷰</h3>
        <button 
          className="text-sm text-blue-500 hover:underline"
          onClick={onViewAllClick}
        >
          전체보기 &gt;
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto space-x-4 bg-white scrollbar-hidden">
        {photoReviewList.map((photoReview) => {
          // review 배열에서 photoReview의 reviewId와 일치하는 리뷰를 찾습니다.
          const matchingReview = review.find((r) => String(r.reviewId) === String(photoReview.reviewId));
  
          return (
            <div
              key={photoReview.reviewId}
              className="flex-none p-2 text-center rounded-lg w-36 bg-gray-50 cursor-pointer"
              // matchingReview가 존재하면 이를, 없으면 photoReview를 전달합니다.
              onClick={() => onReviewClick(matchingReview || photoReview)}
            >
              <img
                src={photoReview.representativeImageUrl || emptyIcon}
                alt="포토 리뷰"
                className="object-cover w-full h-24 mb-2 rounded-lg"
              />
              <p className="text-sm font-bold truncate">{(matchingReview || photoReview)?.nickname || '작성자 없음'}</p>
              <p className="text-xs text-gray-500 truncate">{(matchingReview || photoReview)?.content || '리뷰 내용 없음'}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
  
export default PlaceReviewSection;
