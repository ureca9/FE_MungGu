import Swal from 'sweetalert2';
import PetForm from '../../components/pet/PetForm';
import ROUTER_PATHS from '../../utils/RouterPath';
import { PostPuppyData } from '../../api/pet';
import usePetStore from '../../stores/pet/usePetStore';

const PetRegister = () => {
  const { setBasicData } = usePetStore();
  const puppyRegister = async (formData) => {
    try {
      const puppyFormData = new FormData();
      const joinPuppy = {
        name: formData.name,
        breedId: formData.breedId,
        birthDate: formData.birthDate,
        weight: formData.weight,
        gender: formData.gender,
        neutered: formData.neutered,
        profileImageUrl: formData.profileImageUrl,
      };
      console.log('등록:', joinPuppy);
      setBasicData(joinPuppy);
      puppyFormData.append(
        'data',
        new Blob([JSON.stringify(joinPuppy)], { type: 'application/json' }),
      );
      if (formData.image) {
        puppyFormData.append('image', formData.image);
      }
      const response = await PostPuppyData(puppyFormData);
      console.log('반려동물 등록 성공 :', response.data);
      Swal.fire({
        title: '등록 성공!',
        icon: 'success',
      }).then(() => {
        window.location.href = ROUTER_PATHS.PREFERENCE_PLANT;
      });
    } catch (error) {
      console.error('등록 중 오류 발생:', error);
      Swal.fire({
        title: '등록 실패!',
        icon: 'error',
      });
    }
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex">
          <div className="h-1 w-1/2 bg-[#3288ff]"></div>
          <div className="h-1 w-1/2 bg-[#3288ff] opacity-20"></div>
        </div>
        <PetForm
          title="우리 강아지 정보를 입력해 주세요."
          buttonText="다음"
          deleteButton={false}
          onSubmit={puppyRegister}
        />
      </div>
    </>
  );
};

export default PetRegister;
