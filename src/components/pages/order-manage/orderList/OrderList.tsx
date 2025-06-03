"use client";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useOrderSSE } from "@/lib/useOrderSSE";
import { useQuery } from "@tanstack/react-query";
import { OrderListItems } from "../type/OrderItem";
import { Order } from "./Order";

export const OrderList = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["order-list"],
    queryFn: async () => {
      const fetchData = await fetchWithAuth("/api/order/today");
      const response: { data: OrderListItems[] } = await fetchData.json();
      return response.data;
    },
  });
  useOrderSSE();

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="flex-grow-[5] basis-[50%] max-w-[50%] min-w-[50%] flex flex-col gap-8">
      <div className="flex items-center justify-center relative px-2 py-4 bg-[#FDEACA] rounded-lg">
        <span className="text-2xl">주문 현황</span>
      </div>
      <ul className="grid grid-cols-3 gap-2">
        {data &&
          data.map((order) => {
            return (
              order.status === "IN_PROGRESS" && (
                <li key={order.id} className="justify-self-center">
                  <Order
                    orderItems={order.items}
                    orderId={order.id.toString()}
                  />
                </li>
              )
            );
          })}
      </ul>
    </div>
  );
};
