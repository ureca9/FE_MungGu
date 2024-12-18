import { CRUDBtn } from '../../stories/Buttons/CRUDBtn/CRUDBtn';
import petgray from '../../assets/common/petgray.svg';
import { IoMdCheckmark } from 'react-icons/io';
import usePetStore from '../../stores/pet/usePetStore';
import ROUTER_PATHS from '../../utils/RouterPath';
import Swal from 'sweetalert2';
import { useRef, useEffect } from 'react'; // useRef, useEffect 추가
const MyPet = ({ memberD, navigate }) => {
  const { selectedPetId, setSelectedPetId } = usePetStore();
  const scrollRef = useRef(null); // 스크롤 컨테이너 ref

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      let isDragging = false;
      let startX;
      let scrollLeft;

      const onMouseDown = (e) => {
        isDragging = true;
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 1; // 스크롤 속도 조절
        scrollContainer.scrollLeft = scrollLeft - walk;
      };

      scrollContainer.addEventListener('mousedown', onMouseDown);
      scrollContainer.addEventListener('mouseup', onMouseUp);
      scrollContainer.addEventListener('mouseleave', onMouseUp);
      scrollContainer.addEventListener('mousemove', onMouseMove);

      return () => {
        // 컴포넌트 unmount 시 이벤트 리스너 제거
        scrollContainer.removeEventListener('mousedown', onMouseDown);
        scrollContainer.removeEventListener('mouseup', onMouseUp);
        scrollContainer.removeEventListener('mouseleave', onMouseUp);
        scrollContainer.removeEventListener('mousemove', onMouseMove);
      };
    }
  }, []);

  const handleClick = (puppyId) => {
    if (selectedPetId === puppyId) {
      setSelectedPetId(null);
    } else {
      setSelectedPetId(puppyId);
    }
  };
  return (
    <div className="flex flex-col w-full h-auto p-3 bg-white border rounded-lg sm:p-8 border-borderlineGray">
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
      {/* <div className="flex w-full gap-1 pt-1 overflow-x-auto sm:justify-start sm:gap-2 scrollbar-none"> */}
      <div
        ref={scrollRef} // ref 연결
        className="flex w-full gap-1 pt-4 overflow-x-auto overflow-y-hidden sm:justify-start sm:gap-2 scrollbar-none"
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
          className="flex flex-col items-center justify-center"
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
