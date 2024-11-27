import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';

const UserD = ({memberD, navigate}) => {
  return (
    <div className="flex items-center justify-between h-auto py-5 mt-5 bg-white border rounded-lg px-9 border-borderlineGray min-h-40">
      <span className="flex items-center ">
        <img
          src={memberD?.profileImageUrl}
          alt="사용자 프로필 이미지"
          className="rounded-full size-20"
        />
        <span className="ml-4 text-base">{memberD?.nickname || "닉네임 없음"}</span>
      </span>
      <CRUDBtn
        styleType="reverseBlue"
        size="xs"
        label="수정"
        onClick={(e) => {
          e.preventDefault();
          navigate('/user-edit');
        }}
      />
    </div>
  );
};

export default UserD;
