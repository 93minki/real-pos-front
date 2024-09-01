export type OrderItemDatas = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};
export type OrderItem = {
  _id: string;
  items: OrderItemDatas[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  totalPrice: number;
  __v: number;
};
