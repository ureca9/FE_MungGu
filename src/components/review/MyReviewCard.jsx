import { FaCamera } from 'react-icons/fa';
import { RxStarFilled } from 'react-icons/rx';
import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { DeleteReview } from '../../api/review';

const MyReviewCard = ({ myReview }) => {
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
        cancelButtonColor: '#646464',
        cancelButtonText: '취소',
        confirmButtonText: '삭제',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '삭제 성공!',
            icon: 'success',
          }).then(() => {
            if (myReviewRef.current) {
              myReviewRef.current.handleReviewDataUpdate();
            }
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
          <div className="flex h-full min-w-32">
            {file && file.length > 0 ? (
              file[0].fileType === 'IMAGE' ? (
                <img
                  src={file[0].fileUrl}
                  alt={file[0].fileName}
                  className="object-fill w-full h-full"
                />
              ) : file[0].fileType === 'VIDEO' ? (
                <video
                  src={file[0].fileUrl}
                  alt={file[0].fileName}
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
          <div className="flex flex-col w-full p-2">
            <div className="flex">
              <span className="text-[#FDBD00] text-xl">
                <RxStarFilled />
              </span>
              <span className="">{score}</span>
            </div>
            <div>{plcPenName}</div>
            <div className="line-clamp-1">{content}</div>
            <div className="flex justify-between w-full">
              <div>{visitDate}날짜</div>
              <div className="flex">
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
      </div>
    </div>
  );
};

export default MyReviewCard;
