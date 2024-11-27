import React from 'react';
import PetForm from './PetForm';

const PetAdd = () => {
  const handleAdd = (e) => {
    e.preventDefault();
    console.log('반려동물 추가');
  };

  return (
    <>
      <h1>Pet Add</h1>
      <PetForm
        title="반려동물 추가"
        buttonText="추가"
        deleteButton={false}
        onSubmit01={handleAdd}
      />
    </>
  );
};

export default PetAdd;
