"use client";
import { createMenuStore, MenuStore } from "@/store/menu-store";
import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type MenuStoreApi = ReturnType<typeof createMenuStore>;

export const MenuStoreContext = createContext<MenuStoreApi | undefined>(
  undefined
);

export interface MenuStoreProviderProps {
  children: React.ReactNode;
}

export const MenuStoreProvider = ({ children }: MenuStoreProviderProps) => {
  const storeRef = useRef<MenuStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createMenuStore();
  }

  return (
    <MenuStoreContext.Provider value={storeRef.current}>
      {children}
    </MenuStoreContext.Provider>
  );
};

export const useMenuStore = <T,>(selector: (store: MenuStore) => T): T => {
  const menuStoreContext = useContext(MenuStoreContext);
  if (!menuStoreContext) {
    throw new Error(`useMenuStore must be used within MenuStoreProvider`);
  }
  return useStore(menuStoreContext, selector);
};
