import { create } from 'zustand';

const usePetStore = create((set) => ({
  selectedPetId: null,
  setSelectedPetId: (puppyId) => set({ selectedPetId: puppyId }),
}));

export default usePetStore;
