import { create } from 'zustand';

const useCoordsStore = create((set) => ({
  coords: { latitude: 0, longitude: 0 },
  setCoords: (latitude, longitude) => set({ coords: { latitude, longitude } }),
}));
export default useCoordsStore;
