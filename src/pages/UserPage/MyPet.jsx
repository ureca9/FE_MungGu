import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';
import petgray from '../../assets/common/petgray.svg';
import { useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
const MyPet = ({ memberD, navigate }) => {
  const [choicePuppyId, setChoicePuppyId] = useState(null);
  const handleClick = (puppyId) => {
    setChoicePuppyId(puppyId);
  };
  return (
    <div className="flex flex-col h-auto py-8 bg-white border rounded-lg px-9 border-borderlineGray">
      <div className="flex items-center justify-between mb-6">
        <span>
          <span className="text-xl text-textGray">마이펫</span>
          <span className="text-[#3288FF] ml-1 text-xl">
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
      <div className="flex gap-5">
        {memberD?.puppyList.map((puppy) => (
          <div
            key={puppy.puppyId}
            onClick={() => handleClick(puppy.puppyId)}
            className="relative flex flex-col items-center cursor-pointer"
          >
            <img
              src={puppy.src || petgray}
              alt="마이펫 이미지"
              className="bg-[#F5F5F5] border border-[#8A8A8A] rounded-full size-16"
            />
            <span className="flex justify-center mt-2 text-textGray">
              {puppy.puppyName}
            </span>
            {choicePuppyId === puppy.puppyId && (
              <div className="absolute flex items-center justify-center bg-opacity-45 rounded-full size-16 bg-[#3288FF]">
                <IoMdCheckmark className="text-5xl text-white" />
              </div>
            )}
          </div>
        ))}
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate('/pet-add');
          }}
          className="flex flex-col items-center justify-center hover:bg-sky-500"
        >
          <div className="bg-[#F5F5F5] border border-[#8A8A8A] flex items-center justify-center rounded-full size-16">
            <div className="bg-PlusIcon"></div>
          </div>
          <span className="flex justify-center mt-2 text-textGray">
            추가하기
          </span>
        </button>
      </div>
    </div>
  );
};

export default MyPet;
