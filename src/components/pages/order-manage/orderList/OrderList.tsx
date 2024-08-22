"use client";
import { useQuery } from "@tanstack/react-query";
import { OrderItem } from "../type/OrderItem";
import { Order } from "./Order";

export const OrderList = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const fetchData = await fetch("/api/order/today");
      const response: { data: OrderItem[] } = await fetchData.json();
      return response.data;
    },
  });
  console.log("cache data:", data);
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
