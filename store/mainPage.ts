import {create} from 'zustand';

interface MainPageState {
  offset: number;
  setOffset: (offset: number) => void;
}

export const useMainPageStore = create<MainPageState>(set => ({
  offset: 0,
  setOffset: (offset: number) => set({offset}),
}));
