import React, { useState } from 'react';
import axios from 'axios';
import PetForm from './PetForm';

const PetAdd = () => {
  const puppyAdd = async (formData) => {
    try {
      const response = await axios.post(
        'https://meong9.store/api/v1/api/puppies',
        formData,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `
          Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkbGRtc3RqcjExNEBuYXZlci5jb20iLCJleHAiOjE3MzMxMTcwNDksInJvbGUiOiJNRU1CRVIiLCJpYXQiOjE3MzMwOTkwNDl9.Jl8wubnv_sCIdOybnqaY5wMLWC1ZpgQN6D82P9yZLI8`,
          },
        },
      );
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
