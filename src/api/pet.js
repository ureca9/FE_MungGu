import { instance } from './axios';

export const GetmemberData = async () => {
  try {
    const response = await instance.get('/members', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log('마이페이지 :', response.data);
    return response.data;
  } catch (error) {
    console.error('Error 확인:', error);
    throw error;
  }
};

export const GetBreedsTypeData = async () => {
  try {
    const response = await instance.get('/puppies/types');
    console.log('견종 리스트: ', response.data);
    return response.data;
  } catch (error) {
    console.error('견종목록 오류 확인:', error);
  }
};
export const GetPuppyBasicData = async (selectedPetId) => {
  try {
    const response = await instance.get(`/puppies?puppyId=${selectedPetId}`);
    return response.data;
  } catch (error) {
    console.error('반려동물 정보 가져오기 오류:', error);
  }
};

export const PatchPuppyEditData = async (selectedPetId, puppyFormData) => {
  try {
    const response = await instance.patch(
      `/puppies?puppyId=${selectedPetId}`,
      puppyFormData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log('반려동물 수정 성공 :', response.data);
    return response.data;
  } catch (error) {
    console.error('반려동물 수정 오류 :', error);
  }
};
export const DeletePuppyData = async (selectedPetId) => {
  try {
    const response = await instance.delete(
      `/puppies?puppyId=${selectedPetId}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    console.log('반려동물 삭제 성공 :', response.data);
    return response.data;
  } catch (error) {
    console.error('반려동물 삭제 오류 :', error);
  }
};
