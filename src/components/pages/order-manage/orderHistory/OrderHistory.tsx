"use client";
import { useQuery } from "@tanstack/react-query";
import { OrderItem } from "../type/OrderItem";
import { CompletedOrder } from "./CompletedOrder";

export const OrderHistory = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const fetchData = await fetch("/api/order/today");
      const response: { data: OrderItem[] } = await fetchData.json();
      return response.data;
    },
  });
  if (isPending) return <div>Loading...</div>;

  return (
    <div className="flex-grow-[5] basis-[50%] max-w-[50%] min-w-[50%] flex flex-col gap-8">
      <div className="flex items-center justify-center relative px-2 py-4 bg-[#FDEACA] rounded-lg">
        <span className="text-2xl">완료된 주문</span>
      </div>
      <ul className="grid grid-cols-3 gap-4 ">
        {data &&
          data.map((order) => {
            return (
              !order.active && (
                <li key={order._id} className="">
                  <CompletedOrder
                    orderItems={order.items}
                    orderId={order._id}
                  />
                </li>
              )
            );
          })}
      </ul>
    </div>
  );
};
