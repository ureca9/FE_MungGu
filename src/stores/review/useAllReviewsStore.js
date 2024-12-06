import { create } from 'zustand';

const useAllReviewsStore = create((set) => ({
  pensionsReviewData: null,
  setPensionsReviewData: (Reviews) => set({ pensionsReviewData: Reviews }),
}));
export default useAllReviewsStore;
