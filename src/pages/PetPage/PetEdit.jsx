import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import PetForm from '../../components/pet/PetForm';

const PetEdit = () => {
  const [puppyId, setPuppyId] = useState('');

  const handleEdit = async () => {
    axios.put(`https://meong9.store/api/v1/puppies?puppyid=${puppyId}`, {
      
    });
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

      const response = await axios.put(
        `https://meong9.store/api/v1/puppies?puppyid=${puppyId}`,
        puppyFormData,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkbGRtc3RqcjExNEBuYXZlci5jb20iLCJleHAiOjE3MzMyMTAyMzUsInJvbGUiOiJNRU1CRVIiLCJpYXQiOjE3MzMxOTIyMzV9.lqmPIQaoi-Y8mq_6iORCM5IInvNk34MyOdfXy0ABoLk`,
          },
        },
      );
      console.log('반려동물 수정 성공 :', response.data);
      Swal.fire({
        title: '수정 성공!',
        icon: 'success',
      });
    } catch (error) {
      console.error('반려동물 수정 오류 :', error);
    }
  };
  return (
    <>
      <h1>Pet Edit</h1>
      <PetForm
        title="반려동물 수정 "
        buttonText="수정"
        deleteButton={true}
        onSubmit={handleEdit}
        // basicData = {}
      />
    </>
  );
};

export default PetEdit;
