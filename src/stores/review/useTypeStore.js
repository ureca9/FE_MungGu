import { create } from 'zustand';

const useTypeStore = create((set) => ({
  typePension: null,
  pensionId: null,
  setTypePension: (newTypePension) => set({ typePension: newTypePension }),
  setPensionId: (newPensionId) => set({ pensionId: newPensionId }),
}));
export default useTypeStore;
