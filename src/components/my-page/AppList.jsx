import Swal from 'sweetalert2';
import MyPageImg from '../../assets/my-page-img/MyPageImg.png';
const AppList = () => {
  const appList = [
    {
      name: '설정',
      icon: (
        <div
          className="w-[24px] h-[24px]"
          style={{
            backgroundImage: `url(${MyPageImg})`,
            backgroundPosition: '-10px -133px',
          }}
        ></div>
      ),
    },
    {
      name: '고객센터',
      icon: (
        <div
          className="w-[24px] h-[24px]"
          style={{
            backgroundImage: `url(${MyPageImg})`,
            backgroundPosition: '-65px -78px',
          }}
        ></div>
      ),
    },
    {
      name: '공지사항',
      icon: (
        <div
          className="w-[24px] h-[24px]"
          style={{
            backgroundImage: `url(${MyPageImg})`,
            backgroundPosition: '-149px -10px',
          }}
        ></div>
      ),
    },
  ];
  return (
    <div className="h-auto p-5 mb-3 bg-white border rounded-lg md:py-8 md:mb-5 md:px-9 border-borderlineGray">
      <div className="mb-3 text-xl text-textGray">앱 이용</div>
      <div className="flex flex-col">
        {appList.map((app) => (
          <label key={app.name} className="flex items-center my-3 w-52 ">
            <div className="flex">
              <div>{app.icon}</div>
            </div>
            <button
              onClick={() => {
                Swal.fire({
                  icon: 'info',
                  title: '준비중인 서비스 입니다.',
                  text: '더 나은 경험을 위해 작업 중이에요!',
                  confirmButtonColor: '#3288FF',
                });
              }}
              className="flex justify-start w-24 ml-[14px]"
            >
              {app.name}
            </button>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AppList;
