import { create } from 'zustand';

const useTypeStore = create((set) => ({
  pensionId: null,
  setPensionId: (pensionId) => set({ pensionId: pensionId }),
  plcPenType: null,
  setPlcPenIdType: (type) => set({ plcPenType: type }),
  placeId: null,
  setPlaceId: (placeId) => set({ placeId: placeId }),
}));
export default useTypeStore;
