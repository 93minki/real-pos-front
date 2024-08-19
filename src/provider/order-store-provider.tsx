"use client";

import { createOrderStore, OrderStore } from "@/store/order-store";
import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type OrderStoreApi = ReturnType<typeof createOrderStore>;

export const OrderStoreContext = createContext<OrderStoreApi | undefined>(
  undefined
);

export interface OrderStoreProviderProps {
  children: React.ReactNode;
}

export const OrderStoreProvider = ({ children }: OrderStoreProviderProps) => {
  const storeRef = useRef<OrderStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createOrderStore();
  }

  return (
    <OrderStoreContext.Provider value={storeRef.current}>
      {children}
    </OrderStoreContext.Provider>
  );
};

export const useOrderStore = <T,>(selector: (store: OrderStore) => T): T => {
  const orderStoreContext = useContext(OrderStoreContext);

  if (!orderStoreContext) {
    throw new Error(`useOrderStore must be used within OrderStoreProvider`);
  }

  return useStore(orderStoreContext, selector);
};
