import { create } from 'zustand';

const useAllReviewsStore = create((set) => ({
  // pensionsReviewData: { reviews: [] },
  // setPensionsReviewData: (PensionsReviews) =>
  //   set({ pensionsReviewData: PensionsReviews }),
  pensionsReviewData: { reviews: [], totalPages: 1 }, // reviews 배열과 totalPages 속성을 포함하는 객체로 초기화
  setPensionsReviewData: (data) => set({ pensionsReviewData: data }),
  pensionId: null,
  setPensionId: (pensionId) => set({ pensionId: pensionId }),
}));
export default useAllReviewsStore;
