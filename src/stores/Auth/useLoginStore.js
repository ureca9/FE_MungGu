import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useLoginStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      setLogin: () => set({ isLoggedIn: true }),
      setLogout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'loginStorage',
    },
  ),
);

export default useLoginStore;
