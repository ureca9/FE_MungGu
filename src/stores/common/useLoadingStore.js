import { create } from 'zustand';

const useLoadingStore = create((set) => ({
  isLoading: false,
  isMapLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsMapLoading: (isMapLoading) => set({ isMapLoading }),
}));

export default useLoadingStore;
