import { create } from 'zustand';

const useMapSearchStore = create((set) => ({
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
}));

export default useMapSearchStore;
