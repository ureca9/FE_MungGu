import { useNavigate } from 'react-router-dom';
const AppList = () => {
  const navigate = useNavigate();
  const appList = [
    { name: '설정', path: '/', icon: 'bg-설정_아이콘' },
    { name: '고객센터', path: '/', icon: 'bg-고객센터_아이콘' },
    { name: '공지사항', path: '/', icon: 'bg-공지사항_아이콘' },
  ];
  return (
    <div className="h-auto py-8 mb-5 bg-white border rounded-lg px-9 border-borderlineGray">
      <div className="mb-3 text-xl text-textGray">앱 이용</div>
      <div className="flex flex-col">
        {appList.map((app) => (
          <label key={app.name} className="flex items-center my-3 w-52">
            <div className="flex">
              <div className={app.icon}></div>
            </div>
            <button
              onClick={() => {
                navigate(app.path);
              }}
              className="flex justify-start w-24 ml-[14px] hover:bg-slate-300"
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
