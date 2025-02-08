import FooterLogoImage from '../../stories/assets/footer 로고.svg';
import MailImage from '../../stories/assets/Mail.svg';
import InstarImage from '../../stories/assets/Instar.svg';

const MainFooterInfo = () => {
  return (
    <div>
      <div className="flex w-full bg-[#F5F5F5] md:h-[160px] h-[100px]">
        <div className="flex flex-col items-center md:px-8 px-4 md:text-[26px] text-[16px] justify-center w-full h-full">
          <div className="flex justify-start w-full">
            <img
              src={FooterLogoImage}
              alt="푸터로고고 이미지"
              className="flex mb-1 md:w-[90px] md:h-[30px] text-[#8A8A8A]"
            />
          </div>
          <a
            className="flex pt-2 w-full md:text-[14px] text-[10px] text-[#8A8A8A] "
            href="https://open.kakao.com/o/gqn2F3eh"
          >
            고객센터 : {'('}오픈카톡{')'} https://open.kakao.com/o/gqn2F3eh
          </a>
          <div className="flex pt-1 w-full md:text-[14px] text-[10px] text-[#8A8A8A] justify-between">
            <a className="flex" href="https://open.kakao.com/o/gqn2F3eh">
              상담시간 : 평일 09:00 ~ 18:00 {'('}공휴일 휴무{')'}
            </a>
            <div className="flex">ⓒ https://mungtivity.vercel.app</div>
          </div>
          <div className="flex w-full gap-2 pt-1 md:pt-3">
            <img
              src={MailImage}
              alt="메일 이미지"
              className="flex mb-1 md:w-[18px] md:h-[18px] text-[#8A8A8A]"
            />
            <img
              src={InstarImage}
              alt="인스타 이미지"
              className="flex mb-1 md:w-[18px] md:h-[18px] text-[#8A8A8A]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooterInfo;
