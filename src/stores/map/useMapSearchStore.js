import { create } from 'zustand';

const useMapSearchStore = create((set) => ({
  searchResults: [],
  setSearchResults: (searchResults) => set({ searchResults }),
}));

export default useMapSearchStore;
