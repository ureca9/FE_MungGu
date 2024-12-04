import PetForm from "../../components/pet/PetForm";


const PetRegister = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    console.log('반려동물 등록');
  };

  return (
    <>
      <h1>Pet Register</h1>
      <PetForm
        title="반려동물 등록 "
        buttonText="다음"
        deleteButton={false}
        onSubmit01={handleRegister}
      />
    </>
  );
};

export default PetRegister;
