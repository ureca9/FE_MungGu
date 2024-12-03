import axios from 'axios';
import Swal from 'sweetalert2';
import PetForm from '../../components/pet/PetForm';

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

      const response = await axios.post(
        'https://meong9.store/api/v1/puppies',
        puppyFormData,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkbGRtc3RqcjExNEBuYXZlci5jb20iLCJleHAiOjE3MzMyMTAyMzUsInJvbGUiOiJNRU1CRVIiLCJpYXQiOjE3MzMxOTIyMzV9.lqmPIQaoi-Y8mq_6iORCM5IInvNk34MyOdfXy0ABoLk`,
          },
        },
      );
      console.log('반려동물 추가 성공 :', response.data);
      Swal.fire({
        title: '등록 성공!',
        icon: 'success',
      });
    } catch (error) {
      console.error('추가 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <PetForm
        title="우리 강아지 정보를 입력해 주세요."
        buttonText="추가"
        onSubmit={puppyAdd}
        deleteButton={false}
      />
    </div>
  );
};

export default PetAdd;
