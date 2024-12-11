import Swal from 'sweetalert2';
import ReviewForm from '../../components/review/ReviewForm';
import { GetReviewBasicData, PatchReviewEdit } from '../../api/review';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useTypeStore from '../../stores/review/useTypeStore';
import useReviewEditStore from '../../stores/review/useReviewEditStore.Store';

const ReviewEdit = () => {
  const { id: reviewId } = useParams();
  // const { typePension, setTypePension } = useState();
  // const { reviewBasic, setReviewBasic } = useState();
  const { typePension, setTypePension } = useTypeStore();
  const { reviewBasic, setReviewBasic } = useReviewEditStore();

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await GetReviewBasicData(reviewId);
        console.log('수정할 리뷰 정보:', response.data);
        setReviewBasic(response.data);
        // setTypePension(response.data);
      } catch (error) {
        console.error('반려동물 정보 가져오기 오류:', error);
      }
    };

    if (reviewId) {
      fetchReviewData();
    }
  }, []);

  const reviewEdit = async (Data) => {
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

      const response = await PatchReviewEdit(reviewFormData);
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
    <div>
      <ReviewForm buttonText="수정" onSubmit={reviewEdit} />
    </div>
  );
};

export default ReviewEdit;
