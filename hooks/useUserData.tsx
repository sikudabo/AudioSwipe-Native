import create from 'zustand';
import { persist } from 'zustand/middleware';
import { FanType } from '../typings';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Fan = FanType & {
    isLoggedIn: boolean;
};

type UseUserStateType = {
    fan: Fan | {} | any;
};

type UseUserActionsType = {
    clearFan: () => void;
    setFan: (fan: FanType) => void;
};


export const useUserData = create(
    persist<UseUserStateType & UseUserActionsType>(
      (set) => ({
        fan: {},
        clearFan: () => set(() => ({ fan: {} })),
        setFan: (fan: FanType) => set(() => ({ fan })),
      }),
      {
        getStorage: () => AsyncStorage,
        name: 'artist-data-storage',
      },
    ),
  );