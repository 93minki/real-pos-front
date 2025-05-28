"use client";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useQuery } from "@tanstack/react-query";
import { OrderListItems } from "../type/OrderItem";
import { CompletedOrder } from "./CompletedOrder";

export const OrderHistory = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["order-list"],
    queryFn: async () => {
      const fetchData = await fetchWithAuth("/api/order/today");
      const response: { data: OrderListItems[] } = await fetchData.json();
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
              order.status === "COMPLETED" && (
                <li key={order.id} className="">
                  <CompletedOrder orderItems={order.items} />
                </li>
              )
            );
          })}
      </ul>
    </div>
  );
};
