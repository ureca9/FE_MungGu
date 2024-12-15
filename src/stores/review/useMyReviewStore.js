import { create } from 'zustand';

const useMyReviewStore = create((set) => ({
  myReviews: [],
  setMyReviews: (reviews) => set({ myReviews: reviews }),
}));

export default useMyReviewStore;
