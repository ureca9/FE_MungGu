import { useNavigate } from 'react-router-dom';
import { LoginBtn } from '../stories/Buttons/LoginBtn/LoginBtn';

const Test = () => {
  const navigate = useNavigate();

  const clickFc = () => {
    console.log(`버튼 클릭`);
    navigate('/');
  };

  return (
    <div className="mt-20 w-3/5 flex flex-col mx-auto gap-2">
      <LoginBtn
        styleType="kakao"
        label="카카오로 로그인하기"
        iconSrc="/images/kakao-icon.png" // 아이콘 경로 추가
        onClick={clickFc}
      />
      <LoginBtn
        styleType="google"
        label="구글로 로그인하기"
        iconSrc="/images/google-icon.png" // 아이콘 경로 추가
        onClick={() => console.log('구글 버튼 클릭')}
      />
      <LoginBtn
        styleType="naver"
        label="네이버로 로그인하기"
        iconSrc="/images/naver-icon.png" // 아이콘 경로 추가
        onClick={() => console.log('네이버 버튼 클릭')}
      />
    </div>
  );
};

export default Test;
