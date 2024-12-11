import { instance } from './axios';

export const GetmemberData = async () => {
  try {
    const response = await instance.get('/members', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error 확인:', error);
    throw error;
  }
};

export const GetBreedsTypeData = async () => {
  try {
    const response = await instance.get('/puppies/types');
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
    return response.data;
  } catch (error) {
    console.error('반려동물 삭제 오류 :', error);
  }
};
export const PostPuppyData = async (puppyFormData) => {
  try {
    const response = await instance.post('/puppies', puppyFormData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('등록 중 오류 발생:', error);
  }
};
