import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppList = () => {
  const navigate = useNavigate();
  const appList = [
    { name: '설정', path: '/' },
    { name: '고객센터', path: '/' },
    { name: '공지사항', path: '/' },
  ];
  return (
    <div className="h-auto py-5 mb-5 bg-white border rounded-lg px-9 border-borderlineGray">
      <div className="mb-3 text-lg text-textGray">앱 이용</div>
      <div className="flex flex-col">
        {appList.map((app) => (
          <button
            key={app.name}
            onClick={() => {
              navigate(app.path);
            }}
            className="flex justify-start w-24 py-2 hover:bg-slate-300"
          >
            {app.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppList;
