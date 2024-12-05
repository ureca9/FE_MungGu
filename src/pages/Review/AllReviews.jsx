import { useEffect, useState } from 'react';
import ReviewCard from '../../components/review/ReviewCard';
import { GetAllReviews } from '../../api/review';
import AllReviewHeader from '../../components/review/AllReviewHeader';

const AllReviews = () => {
  const [AllReviews, setAllReviews] = useState([]);
  const liveReviews = async () => {
    try {
      const AllReviewData = await GetAllReviews();

      console.log('장소 모든 리뷰 :', AllReviewData);
      setAllReviews(AllReviewData.data);
    } catch (error) {
      console.error('장소 모든 리뷰 가져오기 실패 :', error);
      throw error;
    }
  };

  // useEffect(() => {
  //   liveReviews();
  // }, []);

  const reviewsData = {
    reviews: [
      {
        reviewId: 796,
        profileImageUrl: null,
        content:
          '작은 강아지 두 마리와 함께 방문했습니다. 잔디 마당이 정말 넓어서 강아지들이 마음껏 뛰어놀 수 있었어요! 방도 깔끔하고 필요한 물품들이 잘 갖춰져 있어서 편리하게 이용했습니다. 다음에 꼭 다시 올게요!',
        score: 4.8,
        visitDate: '2024-10-27',
        nickname: '펫러버',
        file: [
          {
            mediaFileId: 2789,
            fileType: 'IMAGE',
            fileUrl: 'https://example.com/image1.jpg',
          },
        ],
      },
      {
        reviewId: 797,
        profileImageUrl: null,
        content:
          '대형견과 함께 다녀왔는데 정말 만족스러웠습니다! 사장님이 친절하게 안내해주셨고, 바베큐 시설도 정말 훌륭했어요. 주변이 조용해서 힐링하기 딱 좋았습니다. 밤하늘의 별이 너무 예뻤어요.',
        score: 5.0,
        visitDate: '2024-10-28',
        nickname: '댕댕이사랑',
        file: [
          {
            mediaFileId: 2790,
            fileType: 'IMAGE',
            fileUrl: 'https://example.com/image2.jpg',
          },
          {
            mediaFileId: 2791,
            fileType: 'VIDEO',
            fileUrl: 'https://example.com/video1.mp4',
          },
        ],
      },
      {
        reviewId: 798,
        profileImageUrl: null,
        content:
          '아이들과 강아지와 함께 방문했어요. 방은 아늑했고, 마당에서 강아지들이 신나게 놀았어요. 불멍 시설이 있어서 저녁에 가족끼리 오붓한 시간을 보낼 수 있었습니다. 강아지 간식도 서비스로 제공해 주셔서 감동이었어요!',
        score: 4.9,
        visitDate: '2024-10-29',
        nickname: '가족여행자',
        file: [
          {
            mediaFileId: 2792,
            fileType: 'IMAGE',
            fileUrl: 'https://example.com/image3.jpg',
          },
        ],
      },
    ],
  };
  return (
    <div className="container">
      <div className="flex flex-col w-full">
        <div className="px-6 pt-6">
          <AllReviewHeader />
        </div>
        <div className="h-2 mt-1 mb-5 bg-[#D9D9D9]"></div>
        <div className="flex flex-col w-full gap-3 px-6">
          {reviewsData.reviews.map((review, index) => (
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

export default AllReviews;
