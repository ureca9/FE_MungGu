import { create } from 'zustand';

const usePlaceStore = create((set) => ({
  searchResults: [],
  likedPlaces: [],
  selectedPlace: null,
  setSearchResults: (searchResults) => set({ searchResults }),
  setLikedPlaces: (likedPlaces) => set({ likedPlaces }),
  setSelectedPlace: (selectedPlace) => set({ selectedPlace }),
}));

export default usePlaceStore;
