import { create } from 'zustand';

const usePetStore = create((set) => ({
  selectedPetId: null,
  setSelectedPetId: (puppyId) => set({ selectedPetId: puppyId }),
  basicData: null,
  setBasicData: (data) => set({ basicData: data }),
}));

export default usePetStore;
