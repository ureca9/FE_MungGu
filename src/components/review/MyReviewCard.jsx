import { FaCamera } from 'react-icons/fa';
import { RxStarFilled } from 'react-icons/rx';
import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { DeleteReview } from '../../api/review';

const MyReviewCard = ({ myReview, myReviews, setMyReviews }) => {
  const { file, score, plcPenName, content, visitDate, reviewId } = myReview;
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await DeleteReview(reviewId);
      console.log('리뷰 삭제 성공 :', response);
      Swal.fire({
        title: '후기를 삭제할까요?',
        text: '한번 삭제되면 복구되지 않습니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3288FF',
        customClass: {
          cancelButton: 'swalCancelBtn',
        },
        cancelButtonText: '취소',
        confirmButtonText: '삭제',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '삭제 성공!',
            icon: 'success',
          }).then(() => {
            const updatedReviews = myReviews.filter(
              (review) => review.reviewId !== reviewId,
            );
            setMyReviews(updatedReviews);
          });
        }
      });
    } catch (error) {
      console.error('리뷰 삭제 오류 :', error);
      Swal.fire({
        title: '삭제중 오류!',
        icon: 'error',
      });
    }
  };

  return (
    <div>
      <div className="flex">
        <div className=" flex  w-full h-32 rounded-2xl border border-[#8A8A8A] overflow-hidden">
          <div className="flex h-full min-w-32 max-w-32">
            {file ? (
              file.fileType === 'IMAGE' ? (
                <img
                  src={file.fileUrl}
                  alt={file.fileName}
                  className="object-fill w-full h-full"
                />
              ) : file.fileType === 'VIDEO' ? (
                <video
                  src={file.fileUrl}
                  alt={file.fileName}
                  controls
                  className="object-fill w-full h-full"
                />
              ) : null
            ) : (
              <div className="flex text-3xl bg-[#D9D9D9] w-full text-[#8A8A8A] items-center justify-center">
                <FaCamera />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between w-full p-2 ml-3">
            <div className="flex flex-col">
              <div className="flex">
                <span className="text-[#FDBD00] text-2xl">
                  <RxStarFilled />
                </span>
                <span className="ml-1">{score}</span>
              </div>
              <div className="text-[#6F6F6F] line-clamp-1">{plcPenName}</div>
              <div className="line-clamp-1">{content}</div>
            </div>
            <div className="flex justify-between w-full">
              <div className="text-[#8A8A8A] pt- h-full">{visitDate}</div>
            </div>
          </div>
          <div className="flex flex-col justify-end gap-2 p-2 sm:items-end sm:flex-row">
            <span>
              <CRUDBtn
                styleType="reverseBlue"
                size="xs"
                label="수정"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/my-review-edit/${reviewId}`);
                }}
              />
            </span>
            <span>
              <CRUDBtn
                styleType="reverseBlue"
                size="xs"
                label="삭제"
                onClick={handleDelete}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReviewCard;
