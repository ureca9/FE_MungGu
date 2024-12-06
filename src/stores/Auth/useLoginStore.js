import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import LOCAL_STORAGE_KEYS from '../../utils/LocalStorageKey';

const useLoginStore = create(
  persist(
    (set) => ({
      isLoggedIn: () => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        if (!token) return false;
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload.exp > Date.now() / 1000;
        } catch {
          return false;
        }
      },
      hasMemberInfo:
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.HAS_MEMBER_INFO)) ||
        false,
      setLogin: (token) => {
        const tokenWithoutBearer = token.replace('Bearer ', '');
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
          tokenWithoutBearer,
        );
        set({ isLoggedIn: true });
      },
      setHasMemberInfo: (hasMemberInfo) => {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.HAS_MEMBER_INFO,
          JSON.stringify(hasMemberInfo),
        );
        set({ hasMemberInfo });
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
