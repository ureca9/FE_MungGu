import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import PetForm from '../../components/pet/PetForm';
import usePetStore from '../../stores/pet/usePetStore';
import ROUTER_PATHS from '../../utils/RouterPath';
import {
  DeletePuppyData,
  GetPuppyBasicData,
  PatchPuppyEditData,
} from '../../api/pet';

const PetEdit = () => {
  const { selectedPetId, basicData, setBasicData } = usePetStore();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchPetData = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        const response = await GetPuppyBasicData(selectedPetId);
        console.log('반려동물 정보:', response.data);
        setBasicData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('반려동물 정보 가져오기 오류:', error);
        setIsLoading(false);
      }
    };

    if (selectedPetId) {
      fetchPetData();
    }
  }, [selectedPetId]);

  const handleEdit = async (formData) => {
    try {
      const puppyFormData = new FormData();

      const editPuppy = {
        name: formData.name,
        breedId: formData.breedId,
        birthDate: formData.birthDate,
        weight: formData.weight,
        gender: formData.gender,
        neutered: formData.neutered,
      };
      puppyFormData.append(
        'data',
        new Blob([JSON.stringify(editPuppy)], { type: 'application/json' }),
      );

      if (formData.image) {
        puppyFormData.append('image', formData.image);
      }
      const response = await PatchPuppyEditData(selectedPetId, puppyFormData);
      console.log('반려동물 수정 성공 :', response.data);
      setBasicData(null);
      Swal.fire({
        title: '수정 성공!',
        icon: 'success',
      }).then(() => {
        window.location.href = ROUTER_PATHS.MY_PAGE;
      });
    } catch (error) {
      console.error('반려동물 수정 오류 :', error);
      Swal.fire({
        title: '수정 오류!',
        icon: 'error',
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await DeletePuppyData(selectedPetId);
      console.log('반려동물 삭제 성공 :', response.data);
      Swal.fire({
        title: '삭제 성공!',
        icon: 'success',
      }).then(() => {
        window.location.href = ROUTER_PATHS.MY_PAGE;
      });
    } catch (error) {
      console.error('반려동물 삭제 오류 :', error);
      Swal.fire({
        title: '삭제 실패!',
        icon: 'error',
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <div>로딩 중...</div>
      ) : basicData ? (
        <PetForm
          key="edit"
          title="우리 강아지 정보를 수정해주세요."
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
