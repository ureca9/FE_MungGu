import ReviewCard from '../../components/review/ReviewCard';

const LiveReviews = () => {
  const reviews = [
    {
      id: 'pension123', // 펜션 아이디 예시
      name: '바닷가 앞 펜션', // 펜션 이름 예시
      address: '인천광역시 옹진군 영흥면 영흥로', // 펜션 주소 예시
      img: 'https://example.com/pension123.jpg', // 대표 이미지 URL 예시
      reviewAvg: 4.5, // 별점 예시
      reviewCount: 120, // 리뷰 개수 예시
      reviewContent: '리뷰 내용 깨끗하고 경치가 좋아요!', // 리뷰 내용 예시
      nickname: '닉네임', // 작성자 닉네임 예시
      reviewId: '리뷰아이디', // 리뷰 아이디 예시
      type: '펜션',
      date: '2020-01-22',
    },
    {
      id: 'facility789', // 시설 아이디 예시
      name: '힐링 스파', // 시설 이름 예시
      address: '경기도 이천시 모가면 사실로', // 시설 주소 예시
      img: 'https://example.com/facility789.png', // 대표 이미지 URL 예시
      reviewAvg: 4.8, // 별점 예시
      reviewCount: 50, // 리뷰 개수 예시
      reviewContent: '피로가 싹 풀리는 기분이에요~', // 리뷰 내용 예시
      nickname: '닉네임 울랄라신나', // 작성자 닉네임 예시
      reviewId: '리뷰아이디', // 리뷰 아이디 예시
      type: '시설',
      date: '2020-01-22',
    },
  ];

  return (
    <div className="container p-6">
      <div className="flex w-full">
        <div className="flex flex-col w-full gap-3">
          {reviews.map((review, index) => (
            <>
              <ReviewCard key={index} review={review} />
              <div className="h-1 bg-[#D9D9D9] "></div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveReviews;
