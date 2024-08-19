import { createStore } from "zustand";

export type OrderItems = {
  name: string;
  price: number;
  quantity: number;
};

export type OrderState = {
  orderItems: OrderItems[];
  totalPrice: number;
};

export type OrderActions = {
  addOrder: (item: OrderItems) => void;
  deleteOrder: (name: string) => void;
  increaseOrderCount: (name: string) => void;
  decreaseOrderCount: (name: string) => void;
};

export type OrderStore = OrderState & OrderActions;

export const defaultInitiState: OrderState = {
  orderItems: [],
  totalPrice: 0,
};

export const createOrderStore = (initState: OrderState = defaultInitiState) => {
  return createStore<OrderStore>()((set) => ({
    ...initState,
    addOrder: (item) =>
      set((state) => {
        const existItemIndex = state.orderItems.findIndex(
          (orderItem) => orderItem.name === item.name
        );

        if (existItemIndex !== -1) {
          const updateOrderItems = [...state.orderItems];
          const existItem = updateOrderItems[existItemIndex];
          existItem.quantity += 1;

          return {
            orderItems: updateOrderItems,
            totalPrice: state.totalPrice + item.price,
          };
        } else {
          return {
            orderItems: [...state.orderItems, item],
            totalPrice: state.totalPrice + item.price * item.quantity,
          };
        }
      }),
    deleteOrder: (name) =>
      set((state) => {
        const itemToDelete = state.orderItems.find(
          (orderItem) => orderItem.name === name
        );
        if (itemToDelete) {
          return {
            orderItems: state.orderItems.filter(
              (orderItem) => orderItem.name !== name
            ),
            totalPrice:
              state.totalPrice - itemToDelete.price * itemToDelete.quantity,
          };
        } else {
          return state;
        }
      }),
    increaseOrderCount: (name) =>
      set((state) => {
        const existItemIndex = state.orderItems.findIndex(
          (orderItem) => orderItem.name === name
        );

        if (existItemIndex !== -1) {
          const updateOrderItems = [...state.orderItems];
          const existItem = updateOrderItems[existItemIndex];
          existItem.quantity += 1;

          return {
            orderItems: updateOrderItems,
          };
        } else {
          return state;
        }
      }),
    decreaseOrderCount: (name) =>
      set((state) => {
        const existItemIndex = state.orderItems.findIndex(
          (orderItem) => orderItem.name === name
        );

        if (existItemIndex !== -1) {
          const updateOrderItems = [...state.orderItems];
          const existItem = updateOrderItems[existItemIndex];
          if (existItem.quantity > 1) {
            existItem.quantity -= 1;
            return {
              orderItems: updateOrderItems,
            };
          } else {
            return {
              orderItems: state.orderItems.filter(
                (orderItem) => orderItem.name !== name
              ),
            };
          }
        } else {
          return state;
        }
      }),
  }));
};
