// export type OrderItemDatas = {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
// };
// export type OrderItem = {
//   _id: string;
//   items: OrderItemDatas[];
//   active: boolean;
//   createdAt: Date;
//   updatedAt: Date;
//   totalPrice: number;
//   __v: number;
// };

export type OrderItemDatas = {
  id: number;
  quantity: number;
  price: number;
  menu: {
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
