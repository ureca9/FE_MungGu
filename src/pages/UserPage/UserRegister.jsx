import { BasicInput } from '../../stories/Input/BasicInput';

const UserRegister = () => {
  return (
    <div className="w-2/3 mx-auto mt-10">
      <div>
        <div>프로필 이미지</div>
        input
      </div>
      <BasicInput label="이메일" id="name" placeholder="이름을 입력하세요" />
    </div>
  );
};

export default UserRegister;
