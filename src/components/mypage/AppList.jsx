import Swal from 'sweetalert2';
const AppList = () => {
  const appList = [
    { name: '설정', icon: 'bg-설정_아이콘' },
    { name: '고객센터', icon: 'bg-고객센터_아이콘' },
    { name: '공지사항', icon: 'bg-공지사항_아이콘' },
  ];
  return (
    <div className="h-auto py-8 mb-5 bg-white border rounded-lg px-9 border-borderlineGray">
      <div className="mb-3 text-xl text-textGray">앱 이용</div>
      <div className="flex flex-col">
        {appList.map((app) => (
          <label
            key={app.name}
            className="flex items-center my-3 transition duration-300 transform w-52 hover:scale-110"
          >
            <div className="flex">
              <div className={app.icon}></div>
            </div>
            <button
              onClick={() => {
                Swal.fire({
                  icon: 'info',
                  title: '준비중인 서비스 입니다.',
                  text: '더 나은 경험을 위해 작업 중이에요!',
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
