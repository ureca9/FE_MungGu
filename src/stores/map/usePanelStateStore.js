import { create } from 'zustand';

const usePanelStateStore = create((set) => ({
  panelState: 'expanded',
  setPanelState: (panelState) => set({ panelState }),
}));
export default usePanelStateStore;
