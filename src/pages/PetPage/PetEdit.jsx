import React from 'react';
import PetForm from './PetForm';

const PetEdit = () => {
  const handleEdit = () => {
    
    console.log('반려동물 수정');
  };

  return (
    <>
      <h1>Pet Edit</h1>
      <PetForm
        title="반려동물 수정 "
        buttonText="수정"
        deleteButton={true}
        onSubmit={handleEdit}
      />
    </>
  );
};

export default PetEdit;
