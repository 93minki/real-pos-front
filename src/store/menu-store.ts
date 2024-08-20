import { createStore } from "zustand";

export type MenuItem = {
  createdAt: string;
  active: boolean;
  name: string;
  price: number;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type MenuState = {
  menuItems: MenuItem[];
};

export type MenuActions = {
  setMenuItems: (items: MenuItem[]) => void;
  addMenuItem: (item: MenuItem) => void;
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
    addMenuItem: (item) =>
      set((state) => ({ menuItems: [...state.menuItems, item] })),
    clearMenuItems: () => set(initState),
  }));
};
