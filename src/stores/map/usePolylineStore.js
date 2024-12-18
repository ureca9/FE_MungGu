import { create } from 'zustand';

const usePolylineStore = create((set) => ({
  polyline: null,
  setPolyline: (polyline) => set({ polyline }),
  clearPolyline: () => set({ polyline: null }),
}));

export default usePolylineStore;
