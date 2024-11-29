import { create } from 'zustand';
import LOCAL_STORAGE_KEYS from '../utils/LocalStorageKey';

const useLoginStore = create((set) => ({
  isLoggedIn: !!localStorage.getItem(LOCAL_STORAGE_KEYS.MEMBER_ID),
  setLogin: () => set({ isLoggedIn: true }),
  setLogout: () => set({ isLoggedIn: false }),
}));

export default useLoginStore;
