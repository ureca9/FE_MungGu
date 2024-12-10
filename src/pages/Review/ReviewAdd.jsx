import ReviewForm from '../../components/review/ReviewForm';
import { PostPensionsReview } from '../../api/review';
import Swal from 'sweetalert2';
import ROUTER_PATHS from '../../utils/RouterPath';

const ReviewAdd = () => {
  const reviewAdd = async (formData) => {
    try {
      const reviewFormData = new FormData();
      const reviewAdd = {
        plcPenId: formData.pensionId,
        content: formData.content,
        score: formData.score,
        type: formData.type,
        visit_date: formData.visit_date,
      };
      reviewFormData.append(
        'data',
        new Blob([JSON.stringify(reviewAdd)], { type: 'application/json' }),
      );

      if (formData.image) {
        reviewFormData.append('file', formData.image);
      }

      const response = await PostPensionsReview(reviewFormData);
      console.log('리뷰 추가 성공 :', response.data);
      Swal.fire({
        title: '추가 성공!',
        icon: 'success',
      }).then(() => {
        window.location.href = ROUTER_PATHS;
      });
    } catch (error) {
      console.error('추가 중 오류 발생:', error);
    }
  };
  return (
    <div className="">
      <ReviewForm buttonText="저장" deleteButton={false} onSubmit={reviewAdd} />
    </div>
  );
};

export default ReviewAdd;
