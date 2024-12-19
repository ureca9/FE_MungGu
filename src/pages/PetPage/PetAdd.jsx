import Swal from 'sweetalert2';
import PetForm from '../../components/pet/PetForm';
import ROUTER_PATHS from '../../utils/RouterPath';
import { PostPuppyData } from '../../api/pet';

const PetAdd = () => {
  const puppyAdd = async (formData) => {
    try {
      const puppyFormData = new FormData();
      const joinPuppy = {
        name: formData.name,
        breedId: formData.breedId,
        birthDate: formData.birthDate,
        weight: formData.weight,
        gender: formData.gender,
        neutered: formData.neutered,
      };
      puppyFormData.append(
        'data',
        new Blob([JSON.stringify(joinPuppy)], { type: 'application/json' }),
      );

      if (formData.image) {
        puppyFormData.append('image', formData.image);
      }

      const response = await PostPuppyData(puppyFormData);
      Swal.fire({
        title: '추가 성공!',
        icon: 'success',
        confirmButtonColor: '#3288FF',
      }).then(() => {
        window.location.href = ROUTER_PATHS.MY_PAGE;
      });
    } catch (error) {
      console.error('추가 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <PetForm
        key="add"
        title="우리 강아지 정보를 입력해 주세요."
        buttonText="추가"
        onSubmit={puppyAdd}
        deleteButton={false}
      />
    </div>
  );
};

export default PetAdd;
