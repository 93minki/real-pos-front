export type OrderItemDatas = {
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

export type OrderListResponse = {
  success: boolean;
  data: OrderListItems[];
};

export type OrderListItems = {
  id: number;
  status: "IN_PROGRESS" | "COMPLETED";
  created_at: Date;
  updated_at: Date;
  items: OrderItemDatas[];
};
