"use client";

import { create } from "zustand";

interface LoginStore {
  shouldOpen: boolean;
  setShouldOpen: (state: boolean) => void;
}

export const useLoginStore = create<LoginStore>((set) => ({
  shouldOpen: false,
  setShouldOpen: (state: boolean) => set({ shouldOpen: state }),
}));

export const loginSelectors = {
  shouldOpen: (state: LoginStore) => state.shouldOpen,
};

