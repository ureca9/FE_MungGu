import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import PetForm from '../../components/pet/PetForm';
import usePetStore from '../../stores/pet/usePetStore';

const PetEdit = () => {
  const { selectedPetId, setBasicData, basicData } = usePetStore();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchPetData = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) {
          throw new Error('토큰이 없습니다. 로그인 상태를 확인하세요.');
        }
        console.log('유저 정보', token);
        const response = await axios.get(
          `https://meong9.store/api/v1/puppies?puppyId=${selectedPetId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('반려동물 정보:', response.data);
        setBasicData(response.data.data);
        setIsLoading(false); // 로딩 완료
      } catch (error) {
        console.error('반려동물 정보 가져오기 오류:', error);
        setIsLoading(false);
      }
    };

    if (selectedPetId) {
      fetchPetData();
    }
  }, []);

  const handleEdit = async (formData) => {
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

      const token = localStorage.getItem('ACCESS_TOKEN');
      if (!token) {
        throw new Error('토큰이 없습니다. 로그인 상태를 확인하세요.');
      }
      console.log('수정 유저 정보', token);

      const response = await axios.put(
        `https://meong9.store/api/v1/puppies?puppyId=${selectedPetId}`,
        puppyFormData,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
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

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      if (!token) {
        throw new Error('토큰이 없습니다. 로그인 상태를 확인하세요.');
      }

      const response = await axios.delete(
        `https://meong9.store/api/v1/puppies?puppyId=${selectedPetId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('반려동물 삭제 성공 :', response.data);
      Swal.fire({
        title: '삭제 성공!',
        icon: 'success',
      });
      // 삭제 후 페이지 이동 또는 상태 업데이트 등 필요한 작업 수행
    } catch (error) {
      console.error('반려동물 삭제 오류 :', error);
    }
  };

  return (
    <>
      <h1>Pet Edit</h1>
      {isLoading ? (
        <div>로딩 중...</div>
      ) : basicData ? (
        <PetForm
          key="edit"
          title="반려동물 수정 "
          buttonText="수정"
          deleteButton={true}
          onSubmit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div>데이터를 찾을 수 없습니다.</div>
      )}
    </>
  );
};

export default PetEdit;
