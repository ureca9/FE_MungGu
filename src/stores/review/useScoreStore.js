import { create } from 'zustand';

const useScoreStore = create((set) => ({
  score: 0,
  setScore: (newScore) => set({ score: newScore }),
}));
export default useScoreStore;
