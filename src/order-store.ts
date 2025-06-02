import { createStore } from "zustand";

export type OrderItemsType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type OrderState = {
  orderItems: OrderItemsType[];
  totalPrice: number;
};

export type OrderActions = {
  addOrder: (item: OrderItemsType) => void;
  deleteOrder: (id: number) => void;
  increaseOrderCount: (id: number) => void;
  decreaseOrderCount: (id: number) => void;
  reset: () => void;
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
          (orderItem) => orderItem.id === item.id
        );

        if (existItemIndex !== -1) {
          const updateOrderItems = [...state.orderItems];
          const existItem = updateOrderItems[existItemIndex];
          existItem.quantity += 1;

          return {
            orderItems: updateOrderItems,
            totalPrice: updateOrderItems.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            ),
          };
        } else {
          return {
            orderItems: [...state.orderItems, item],
            totalPrice: state.totalPrice + item.price * item.quantity,
          };
        }
      }),
    deleteOrder: (id) =>
      set((state) => {
        const existItemIndex = state.orderItems.findIndex(
          (orderItem) => orderItem.id === id
        );

        if (existItemIndex !== -1) {
          const updateOrderItems = state.orderItems.filter(
            (orderItem) => orderItem.id !== id
          );
          return {
            orderItems: updateOrderItems,
            totalPrice: updateOrderItems.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            ),
          };
        } else {
          return state;
        }
      }),
    increaseOrderCount: (id) =>
      set((state) => {
        const existItemIndex = state.orderItems.findIndex(
          (orderItem) => orderItem.id === id
        );

        if (existItemIndex !== -1) {
          const updateOrderItems = [...state.orderItems];
          const existItem = updateOrderItems[existItemIndex];
          existItem.quantity += 1;

          return {
            orderItems: updateOrderItems,
            totalPrice: updateOrderItems.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            ),
          };
        } else {
          return state;
        }
      }),
    decreaseOrderCount: (id) =>
      set((state) => {
        const existItemIndex = state.orderItems.findIndex(
          (orderItem) => orderItem.id === id
        );

        if (existItemIndex !== -1) {
          const updateOrderItems = [...state.orderItems];
          const existItem = updateOrderItems[existItemIndex];
          if (existItem.quantity > 1) {
            existItem.quantity -= 1;
            return {
              orderItems: updateOrderItems,
              totalPrice: updateOrderItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              ),
            };
          } else {
            const deletedItem = state.orderItems.filter(
              (item) => item.id !== id
            );
            return {
              orderItems: deletedItem,
              totalPrice: deletedItem.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              ),
            };
          }
        } else {
          return state;
        }
      }),
    reset: () => {
      set(initState);
    },
  }));
};
