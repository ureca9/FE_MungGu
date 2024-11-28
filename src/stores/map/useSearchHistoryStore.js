import { create } from 'zustand';

const useSearchHistoryStore = create((set) => ({
  searchHistory: [],
  setSearchHistory: (searchHistory) => set({ searchHistory }),
}));

export default useSearchHistoryStore;
