import { instance } from '../axios';

export const createInterestEndpoint = (resource) => ({
  get: async () => {
    try {
      const response = await instance.get(`/members/interests/${resource}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          `선호 ${resource} 가져오기 중 오류가 발생했습니다.`,
      );
    }
  },

  save: async (data) => {
    try {
      const response = await instance.patch(
        `/members/interests/${resource}`,
        { [resource]: data },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          `선호 ${resource} 저장 중 오류가 발생했습니다.`,
      );
    }
  },
});
