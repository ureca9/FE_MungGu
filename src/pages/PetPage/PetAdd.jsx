import React, { useState } from 'react';
import axios from 'axios';
import PetForm from './PetForm';

const PetAdd = () => {
  const puppyAdd = async (formData) => {
    try {
      const response = await axios.post('/api/puppies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('반려동물 추가 성공 :', response.data);
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
