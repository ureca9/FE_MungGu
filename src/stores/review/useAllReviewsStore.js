import { create } from 'zustand';

const useAllReviewsStore = create((set) => ({
  pensionsReviewData: { reviews: [] },
  setPensionsReviewData: (PensionsReviews) =>
    set({ pensionsReviewData: PensionsReviews }),
}));
export default useAllReviewsStore;
