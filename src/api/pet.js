import { instance } from './axios';

export const memberData = async () => {
  try {
    const token = localStorage.getItem('ACCESS_TOKEN');

    if (!token) {
      throw new Error('토큰이 없습니다. 로그인 상태를 확인하세요.');
    }
    const response = await instance.get('/members', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('마이페이지 :', response.data);
    return response.data;
  } catch (error) {
    console.error('Error 확인:', error);
    throw error;
  }
};

export const BreedsTypeData = async () => {
  try {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token) {
      throw new Error('토큰이 없습니다. 로그인 상태를 확인하세요.');
    }
    console.log('유저 토큰', token);
    const response = await instance.get(
      'https://meong9.store/api/v1/puppies/types',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('견종 리스트: ', response.data);
    return response.data;
  } catch (error) {
    console.error('견종목록 오류 확인:', error);
  }
};
export const PuppyBasicData = async (selectedPetId) => {
  try {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token) {
      throw new Error('토큰이 없습니다. 로그인 상태를 확인하세요.');
    }
    console.log('유저 정보', token);
    const response = await instance.get(
      `https://meong9.store/api/v1/puppies?puppyId=${selectedPetId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('반려동물 정보 가져오기 오류:', error);
  }
};
export const PuppyEditData = async (selectedPetId, puppyFormData) => {
  try {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token) {
      throw new Error('토큰이 없습니다. 로그인 상태를 확인하세요.');
    }
    console.log('수정 유저 정보', token);
    const response = await instance.patch(
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
    return response.data;
  } catch (error) {
    console.error('반려동물 수정 오류 :', error);
  }
};
export const PuppyDeleteData = async (selectedPetId) => {
  try {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token) {
      throw new Error('토큰이 없습니다. 로그인 상태를 확인하세요.');
    }

    const response = await instance.delete(
      `https://meong9.store/api/v1/puppies?puppyId=${selectedPetId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('반려동물 삭제 성공 :', response.data);
    return response.data;
  } catch (error) {
    console.error('반려동물 삭제 오류 :', error);
  }
};
