import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceList = () => {
  const navigate = useNavigate();
  const serviceList = [
    { name: '이벤트', path: '/' },
    { name: '내 예약', path: '/' },
    { name: '내가 쓴 후기', path: '/' },
    { name: '최근 본 장소', path: '/' },
  ];
  return (
    <div className="h-auto py-5 bg-white border rounded-lg px-9 border-borderlineGray">
      <div className="mb-3 text-lg text-textGray">서비스 관리</div>
      <div className="flex flex-col">
        {serviceList.map((service) => (
          <button
            key={service.name}
            onClick={() => {
              navigate(service.path);
            }}
            className="flex justify-start w-24 py-2 hover:bg-slate-300"
          >
            {service.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
