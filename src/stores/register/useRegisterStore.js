import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import LOCAL_STORAGE_KEYS from '../../utils/LocalStorageKey';

const useRegisterStore = create(
  persist(
    (set) => ({
      userInfo: {
        name: '',
        nickname: '',
        phone: '',
      },
      setUserInfo: (userInfo) =>
        set((state) => ({
          userInfo: { ...state.userInfo, ...userInfo },
        })),
      agreements: {
        agreeTerms: false,
        agreePrivacy: false,
        agreeMarketing: false,
      },
      setAgreements: (agreements) =>
        set((state) => ({
          agreements: { ...state.agreements, ...agreements },
        })),

      petInfo: {
        name: '',
        breedId: '',
        birthDate: '',
        weight: '',
        gender: '',
        neutered: false,
        image: null,
      },
      setPetInfo: (petInfo) =>
        set((state) => ({ petInfo: { ...state.petInfo, ...petInfo } })),

      selectedPlants: [],
      setSelectedPlants: (plants) => set({ selectedPlants: plants }),

      selectedRegions: [],
      setSelectedRegions: (regions) => set({ selectedRegions: regions }),

      resetState: () => {
        set({
          userInfo: { name: '', nickname: '', phone: '' },
          agreements: {
            agreeTerms: false,
            agreePrivacy: false,
            agreeMarketing: false,
          },
          petInfo: {
            name: '',
            breedId: '',
            birthDate: '',
            weight: '',
            gender: '',
            neutered: false,
            image: null,
          },
          selectedPlants: [],
          selectedRegions: [],
        });
        localStorage.removeItem('register-storage');
      },
    }),
    {
      name: LOCAL_STORAGE_KEYS.REGISTER_STORAGE,
      partialize: (state) => ({
        userInfo: state.userInfo,
        agreements: state.agreements,
        selectedPlants: state.selectedPlants,
      }),
    },
  ),
);

export default useRegisterStore;
