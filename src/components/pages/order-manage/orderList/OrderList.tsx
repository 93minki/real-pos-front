"use client";
import { OrderItems } from "@/store/order-store";
import { useQuery } from "@tanstack/react-query";
import { Order } from "./Order";

export interface OrderItemDatas extends OrderItems {
  _id: string;
}

type OrderDataType = {
  _id: string;
  items: OrderItemDatas[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const OrderList = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const fetchData = await fetch("/api/order");
      const response: { data: OrderDataType[] } = await fetchData.json();
      return response.data;
    },
  });

  if (isPending) return <div>Loading...</div>;

  return (
    <ul className="grid grid-cols-5 gap-4">
      {data &&
        data.map((order) => {
          return (
            order.active && (
              <li key={order._id} className="">
                <Order orderItems={order.items} orderId={order._id} />
              </li>
            )
          );
        })}
    </ul>
  );
};
