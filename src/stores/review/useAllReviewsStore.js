import { create } from 'zustand';

const useAllReviewsStore = create((set) => ({
  pensionsReviewData: { reviews: [] },
  setPensionsReviewData: (PensionsReviews) =>
    set({ pensionsReviewData: PensionsReviews }),
  pensionId: null,
  setPensionId: (pensionId) => set({ pensionId: pensionId }),
}));
export default useAllReviewsStore;
