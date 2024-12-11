import ReviewForm from "../../components/review/ReviewForm";

const ReviewEdit = () => {

  return (
    <div>
      <h1>후기 수정</h1>
      <ReviewForm buttonText="저장" deleteButton={false} onSubmit={reviewEdit} />
    </div>
  );
};

export default ReviewEdit;
