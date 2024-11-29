import { create } from 'zustand';

const useLoginStore = create((set) => ({
  isLoggedIn: false,
  setLogin: () => set({ isLoggedIn: true }),
  setLogout: () => set({ isLoggedIn: false }),
}));

export default useLoginStore;
