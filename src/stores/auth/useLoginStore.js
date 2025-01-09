import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import LOCAL_STORAGE_KEYS from '../../utils/LocalStorageKey';

const useLoginStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      checkIsLoggedIn: () => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        if (!token) return false;
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (!payload.sub || !payload.iat) return false;
          return payload.exp > Date.now() / 1000;
        } catch {
          console.error('토큰 검증 중 오류 발생');
          return false;
        }
      },
      setLogin: (token) => {
        const tokenWithoutBearer = token.replace('Bearer ', '');
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
          tokenWithoutBearer,
        );
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
