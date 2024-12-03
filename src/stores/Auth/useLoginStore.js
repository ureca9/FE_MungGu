import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import LOCAL_STORAGE_KEYS from '../../utils/LocalStorageKey';

const useLoginStore = create(
  persist(
    (set) => ({
      isLoggedIn: !!localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN),
      setLogin: (token) => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token);
        set({ isLoggedIn: true });
      },
      setLogout: () => {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        set({ isLoggedIn: false });
      },
    }),
    {
      name: 'loginStorage',
    },
  ),
);

export default useLoginStore;
