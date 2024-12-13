import { create } from 'zustand';

const usePlaceStore = create((set) => ({
  searchResults: [],
  likedPlaces: [],
  setSearchResults: (searchResults) => set({ searchResults }),
  setLikedPlaces: (likedPlaces) => set({ likedPlaces }),
}));

export default usePlaceStore;
