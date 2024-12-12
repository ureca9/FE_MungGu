import ReviewForm from '../../components/review/ReviewForm';
import { PostPensionsReview } from '../../api/review';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const ReviewAdd = () => {
  const { id: Id } = useParams();
  const reviewAdd = async (Data) => {
    try {
      const reviewFormData = new FormData();
      const reviewAdd = {
        plcPenId: Data.plcPenId,
        content: Data.content,
        score: Data.score,
        type: Data.type,
        visitDate: Data.visitDate,
      };
      reviewFormData.append(
        'data',
        new Blob([JSON.stringify(reviewAdd)], { type: 'application/json' }),
      );

      // `Data.file`이 배열인지 확인
      if (Array.isArray(Data.file)) {
        Data.file.forEach((file) => {
          reviewFormData.append('file', file);
        });
      } else if (Data.file) {
        reviewFormData.append('file', Data.file);
      }
      console.log('리뷰 저장:', [...reviewFormData.entries()]);

      const response = await PostPensionsReview(reviewFormData);
      console.log('리뷰 추가 성공 :', response.data);
      Swal.fire({
        title: '추가 성공!',
        icon: 'success',
      }).then(() => {
        window.location.href = `/pension-all-review/${Id}`;
      });
    } catch (error) {
      console.error('추가 중 오류 발생:', error);
    }
  };
  return (
    <div className="">
      <ReviewForm buttonText="저장" onSubmit={reviewAdd} />
    </div>
  );
};

export default ReviewAdd;
