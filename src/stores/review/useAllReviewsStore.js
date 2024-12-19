import { create } from 'zustand';

const useAllReviewsStore = create((set) => ({
  pensionsReviewData: { reviews: [], totalPages: 1 },
  setPensionsReviewData: (data) => set({ pensionsReviewData: data }),
  pensionId: null,
  setPensionId: (pensionId) => set({ pensionId: pensionId }),
}));
export default useAllReviewsStore;
