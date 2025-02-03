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
      if (!response.data?.data) {
        throw new Error('응답 데이터 구조가 올바르지 않습니다.');
      }
      return response.data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error('인증이 필요합니다.');
      }
      if (error.response?.status === 404) {
        throw new Error(`${resource}를 찾을 수 없습니다.`);
      }
      throw new Error(
        error.response?.data?.message ||
          `선호 ${resource} 가져오기 중 오류가 발생했습니다.`,
      );
    }
  },

  save: async (data) => {
    if (!Array.isArray(data)) {
      throw new Error('데이터는 배열 형식이어야 합니다.');
    }
    if (data.length === 0) {
      throw new Error('최소 하나 이상의 항목을 선택해주세요.');
    }

    const maxRetries = 3;
    let retryCount = 0;

    while (retryCount < maxRetries) {
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
        if (error.code === 'ECONNABORTED' && retryCount < maxRetries - 1) {
          retryCount++;
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * retryCount),
          );
          continue;
        }
        throw new Error(
          error.response?.data?.message ||
            `선호 ${resource} 저장 중 오류가 발생했습니다.`,
        );
      }
    }
  },
});
