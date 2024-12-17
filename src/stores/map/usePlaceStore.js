import { create } from 'zustand';
import { SearchType } from '../../utils/SearchType.js';

const usePlaceStore = create((set) => ({
  searchResults: [],
  likedPlaces: [],
  searchType: SearchType.SEARCH,
  selectedPlace: null,
  startLocation: null,
  endLocation: null,
  setSearchResults: (searchResults) => {
    set({ searchResults });
    console.log(searchResults);
  },
  setLikedPlaces: (likedPlaces) => set({ likedPlaces }),
  setSearchType: (searchType) => set({ searchType }),
  setSelectedPlace: (selectedPlace) => set({ selectedPlace }),
  setStartLocation: (startLocation) => set({ startLocation }),
  setEndLocation: (endLocation) => set({ endLocation }),
}));

export default usePlaceStore;
