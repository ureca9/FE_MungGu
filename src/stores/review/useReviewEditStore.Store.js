import { create } from 'zustand';

const useReviewEditStore = create((set) => ({
  reviewBasic: null,
  setReviewBasic: (reviewBasic) => set({ reviewBasic: reviewBasic }),
}));
export default useReviewEditStore;
