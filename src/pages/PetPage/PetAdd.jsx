import React, { useState } from 'react';
import axios from 'axios';
import PetForm from './PetForm';

const PetAdd = () => {
  const puppyAdd = async (formData) => {
    try {
      // FormData 생성
      const formDataToSend = new FormData();

      // JSON 텍스트 데이터 추가
      const jsonPayload = {
        name: formData.name,
        breedId: formData.breedId,
        birthDate: formData.birthDate,
        weight: formData.weight,
        gender: formData.gender,
        neutered: formData.neutered,
      };
      formDataToSend.append(
        'data',
        new Blob([JSON.stringify(jsonPayload)], { type: 'application/json' }),
      );

      // 이미지 데이터 추가
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      // Axios 요청
      const response = await axios.post(
        'https://meong9.store/api/v1/puppies',
        formDataToSend,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkbGRtc3RqcjExNEBuYXZlci5jb20iLCJleHAiOjE3MzMxNDAyMDQsInJvbGUiOiJNRU1CRVIiLCJpYXQiOjE3MzMxMjIyMDR9.VAbv2W7kfaQht1ii-t9e14JallX9RedFoWM9J16eg1Q`,
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
