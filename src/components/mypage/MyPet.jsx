import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';
import petgray from '../../assets/common/petgray.svg';
import { IoMdCheckmark } from 'react-icons/io';
import usePetStore from '../../stores/pet/usePetStore';
import ROUTER_PATHS from '../../utils/RouterPath';
import Swal from 'sweetalert2';
import MyPageImg from '../../assets/MypageImg/MyPageImg.png';
import { useRef, useEffect } from 'react';
const MyPet = ({ memberD, navigate }) => {
  const { selectedPetId, setSelectedPetId } = usePetStore();
  const scrollRef = useRef(null);

  const { setBasicData } = usePetStore();
  useEffect(() => {
    setBasicData(null);
  }, [setBasicData]);

  const handleWheel = (e) => {
    e.preventDefault();
    const ref = scrollRef.current;
    if (e.deltaY > 0) {
      ref.scrollLeft += 40;
    } else {
      ref.scrollLeft -= 40;
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('wheel', handleWheel);
    }
    return () => {
      if (ref) {
        ref.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const handleClick = (puppyId) => {
    if (selectedPetId === puppyId) {
      setSelectedPetId(null);
    } else {
      setSelectedPetId(puppyId);
    }
  };
  return (
    <div className="flex flex-col w-full h-auto p-5 bg-white border rounded-lg md:p-8 border-borderlineGray">
      <div className="flex items-center justify-between mb-2">
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
            selectedPetId
              ? navigate(
                  ROUTER_PATHS.PET_EDIT_ID.replace(':puppyId', selectedPetId),
                )
              : Swal.fire({
                  title: '편집할 마이펫을 선택해주세요.',
                  icon: 'warning',
                  confirmButtonColor: '#3288FF',
                });
          }}
        />
      </div>
      <div
        ref={scrollRef}
        className="flex w-full gap-1 pt-4 overflow-x-auto overflow-y-hidden md:justify-start md:gap-2 scrollbar-none"
      >
        {memberD?.puppyList.map((puppy) => (
          <div
            key={puppy.puppyId}
            onClick={() => handleClick(puppy.puppyId)}
            className="relative flex flex-col items-center w-20 pt-2 transition duration-300 transform cursor-pointer min-w-20 hover:scale-110"
          >
            <img
              src={puppy.puppyImageUrl || petgray}
              alt="마이펫 이미지"
              className="bg-[#F5F5F5] border border-[#8A8A8A] rounded-full size-16"
            />
            <span className="justify-center mt-2 text-textGray line-clamp-1">
              {puppy.puppyName}
            </span>
            {selectedPetId === puppy.puppyId && (
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
          className="flex flex-col items-center justify-center pt-2 pr-1 transition duration-300 transform hover:scale-105"
        >
          <div className="bg-[#F5F5F5] border border-[#8A8A8A] flex items-center justify-center rounded-full size-16">
            <div
              className="w-[35px] h-[35px]"
              style={{
                backgroundImage: `url(${MyPageImg})`,
                backgroundPosition: ' -10px -78px',
              }}
            ></div>
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
