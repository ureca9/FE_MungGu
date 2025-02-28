import { instance } from '../axios';

/**
 * @param {string} nickname
 * @returns {Promise<string>}
 */
export const checkNickname = async (nickname) => {
  if (!nickname.trim()) {
    throw new Error('닉네임을 입력해주세요.');
  }

  try {
    const { data } = await instance.get(
      `/members/check?nickname=${encodeURIComponent(nickname)}`,
    );
    return data.message;
  } catch (error) {
    console.error('닉네임 확인 중 오류:', error);
    throw new Error('닉네임 확인 중 오류가 발생했습니다.');
  }
};
