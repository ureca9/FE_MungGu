import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import PetForm from '../../components/pet/PetForm';
import usePetStore from '../../stores/usePetStore';

const PetEdit = () => {
  const { selectedPetId } = usePetStore();
  const [basicData, setBasicData] = useState(null); // 기존 정보 저장
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchPetData = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        const accessToken = localStorage.getItem('access_token');
        console.log('유저 정보', accessToken);
        const response = await axios.get(
          `https://meong9.store/api/v1/puppies?puppyid=${selectedPetId}`,
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkbGRtc3RqcjExNEBuYXZlci5jb20iLCJleHAiOjE3MzMyMjM0MTMsInJvbGUiOiJNRU1CRVIiLCJpYXQiOjE3MzMyMDU0MTN9.dEwpMQ9WwA1p2K8dSGhkioqvkRCvBCJ7nq4nSOqpKsI`,
            },
          },
        );
        console.log('반려동물 정보:', response.data);
        setBasicData(response.data);
        setIsLoading(false); // 로딩 완료
      } catch (error) {
        console.error('반려동물 정보 가져오기 오류:', error);
        setIsLoading(false);
      }
    };

    if (selectedPetId) {
      fetchPetData();
    }
  }, [selectedPetId]); // selectedPetId가 변경될 때마다 실행
  const handleEdit = async (formData) => {
    // formData 매개변수 추가
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

      const response = await axios.put(
        `https://meong9.store/api/v1/puppies?puppyid=${selectedPetId}`,
        puppyFormData,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkbGRtc3RqcjExNEBuYXZlci5jb20iLCJleHAiOjE3MzMyMTAyMzUsInJvbGUiOiJNRU1CRVIiLCJpYXQiOjE3MzMxOTIyMzV9.lqmPIQaoi-Y8mq_6iORCM5IInvNk34MyOdfXy0ABoLk`,
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
  return (
    <>
      <h1>Pet Edit</h1>
      {isLoading ? ( // 로딩 중이면 로딩 메시지 표시
        <div>로딩 중...</div>
      ) : basicData ? ( // 로딩 완료 후 basicData가 있으면 PetForm 렌더링
        <PetForm
          title="반려동물 수정 "
          buttonText="수정"
          deleteButton={true}
          onSubmit={handleEdit}
          basicData={basicData}
        />
      ) : (
        <div>데이터를 찾을 수 없습니다.</div> // 로딩 완료 후 basicData가 없으면 메시지 표시
      )}
    </>
  );
};

export default PetEdit;
