import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';
import petgray from '../../assets/common/petgray.svg';
import { useState } from 'react';

const MyPet = ({ memberD, navigate }) => {
  const [choicePuppyId, setChoicePuppyId] = useState(null);
  const handleClick = (puppyId) => {
    setChoicePuppyId(puppyId);
  };
  return (
    <div className="flex flex-col h-auto py-5 bg-white border rounded-lg px-9 border-borderlineGray">
      <div className="flex items-center justify-between mb-6">
        <span>
          <span className="text-lg text-textGray">마이펫</span>
          <span className="text-[#3288FF] ml-1">
            {memberD?.puppyList.length}
          </span>
        </span>
        <CRUDBtn
          styleType="reverseBlue"
          size="xs"
          label="편집"
          onClick={(e) => {
            e.preventDefault();
            choicePuppyId
              ? navigate(`/pet-edit/${choicePuppyId}`)
              : alert('편집할 마이펫을 선택해주세요.');
          }}
        />
      </div>
      <div className="flex items-center gap-5">
        {memberD?.puppyList.map((puppy) => (
          <div
            key={puppy.puppyId}
            onClick={() => handleClick(puppy.puppyId)}
            className={`flex-col hover:bg-sky-500 cursor-pointer ${
              choicePuppyId === puppy.puppyId ? 'bg-sky-500' : ''
            }`}
          >
            <img
              src={puppy.src || petgray}
              alt="마이펫 이미지"
              className="bg-gray-200 rounded-full size-16"
            />
            <span className="flex justify-center text-textGray">
              {puppy.puppyName}
            </span>
          </div>
        ))}
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate('/pet-add');
          }}
          className="flex-col hover:bg-sky-500"
        >
          <img
            src={petgray}
            alt="펫 추가 이미지"
            className="bg-gray-200 rounded-full size-16"
          />
          <span className="flex justify-center text-textGray">추가</span>
        </button>
      </div>
    </div>
  );
};

export default MyPet;
