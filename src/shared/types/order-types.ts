export type OrderItemType = {
  id: number;
  quantity: number;
  price: number;
  menu: {
    quantity: any;
    id: string;
    name: string;
    price: number;
    category: string | null;
    description: string | null;
    is_active: 1 | 0;
    created_at: Date;
    updated_at: Date;
  };
};

export type OrderStoreItemType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type OrderType = {
  id: number;
  status: "IN_PROGRESS" | "COMPLETED";
  created_at: Date;
  updated_at: Date;
  items: OrderItemType[];
};

export type GetOrderListResponseType = {
  success: boolean;
  error?: string;
  data: OrderType[];
};

export type EditOrderResponseType = {
  success: boolean;
  error?: string;
  data: OrderType;
};

export type ConfirmOrderResponseType = {
  success: boolean;
  error?: string;
  data: OrderType;
};

export type DeleteOrderResponseType = {
  success: true;
  error?: string;
  data: { code: string; message: string };
};
