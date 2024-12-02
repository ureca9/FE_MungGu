import React from 'react';
import PetForm from './PetForm';

const PetEdit = () => {

//   const [puppyId, setPuppyId] = useState('');


//   const handleEdit = async () => {
//     try {
//       const accessToken = localStorage.getItem('access_token');
//       console.log('유저 정보', accessToken);
//       const response = await axios.get(
//         `https://meong9.store/api/v1/puppies?puppyid=${puppyId}`,
//         {
//           headers: {
//             Authorization: `
// Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkbGRtc3RqcjExNEBuYXZlci5jb20iLCJleHAiOjE3MzMxMTcwNDksInJvbGUiOiJNRU1CRVIiLCJpYXQiOjE3MzMwOTkwNDl9.Jl8wubnv_sCIdOybnqaY5wMLWC1ZpgQN6D82P9yZLI8`,
//           },
//         },
//       );
//       console.log('반려동물 정보 : ', response.data);
//       set(response.data.data);
//     } catch (error) {
//       console.error('반려동물 정보 오류 :', error);
//     }
//   };
  return (
    <>
      <h1>Pet Edit</h1>
      <PetForm
        title="반려동물 수정 "
        buttonText="수정"
        deleteButton={true}
        // onSubmit={handleEdit}
        // basicData = {}
      />
    </>
  );
};

export default PetEdit;
