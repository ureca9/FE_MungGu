const PlaceReviewSection = ({ review, onReviewClick, emptyIcon, onViewAllClick }) => {
  const reviewsToShow = review || [];

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
      {reviewsToShow.length > 0 ? (
        <div className="flex gap-2 overflow-x-auto space-x-4 bg-white scrollbar-hidden">
          {reviewsToShow.map((item) => {
            console.log('리뷰 아이템:', item);  // 디버깅 로그 추가

            // 대표 이미지 선택 (file 배열에서 IMAGE 타입 파일 우선)
            const firstImageFile = item.file?.find((file) => file.fileType === 'IMAGE');
            const imageUrl = firstImageFile?.fileUrl || emptyIcon;

            return (
              <div
                key={item.reviewId}
                className="flex-none p-2 text-center rounded-lg w-36 bg-gray-50 cursor-pointer"
                onClick={() => onReviewClick(item)}
              >
                <img
                  src={imageUrl}
                  alt="리뷰 이미지"
                  className="object-cover w-full h-24 mb-2 rounded-lg"
                />
                <p className="text-sm font-bold truncate">{item.nickname || '작성자 없음'}</p>
                <p className="text-xs text-gray-500 truncate">{item.content || '리뷰 내용 없음'}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-sm text-center text-gray-500">리뷰가 없습니다.</div>
      )}
    </section>
  );
};

export default PlaceReviewSection;
