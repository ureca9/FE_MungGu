import React, { useState } from 'react';
import PetForm from './PetForm';
import axios from 'axios';
import Swal from 'sweetalert2';

const PetEdit = () => {

  const [puppyId, setPuppyId] = useState('');

  const handleEdit = async () => {
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
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkbGRtc3RqcjExNEBuYXZlci5jb20iLCJleHAiOjE3MzMxNzMwNzgsInJvbGUiOiJNRU1CRVIiLCJpYXQiOjE3MzMxNTUwNzh9.S_JLkzK7W4UA0iG8qncxmnotm1X7e6Uoxay_QR22bwA`,
          },
        },
      );
      console.log('반려동물 추가 성공 :', response.data);
      Swal.fire({
        title: '등록 성공!',
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
