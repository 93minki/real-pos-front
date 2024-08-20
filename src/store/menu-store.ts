import { createStore } from "zustand";

export type MenuItem = {
  id: string;
  name: string;
  price: number;
};

export type MenuState = {
  menuItems: MenuItem[];
};

export type MenuActions = {
  setMenuItems: (items: MenuItem[]) => void;
  clearMenuItems: () => void;
};

export type MenuStore = MenuState & MenuActions;

export const defaultInitiState: MenuState = {
  menuItems: [],
};

export const createMenuStore = (initState: MenuState = defaultInitiState) => {
  return createStore<MenuStore>()((set) => ({
    ...initState,
    setMenuItems: (items) => set((state) => ({ menuItems: items })),
    clearMenuItems: () => set(initState),
  }));
};
