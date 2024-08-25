"use client";

import { calcTotalPrice } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderItem, OrderItemDatas } from "../type/OrderItem";

interface CompletedOrderProp {
  orderItems: OrderItemDatas[];
  orderId: string;
}

const updateActiveState = async (orderId: string) => {
  const response = await fetch(`/api/order/${orderId}`, {
    method: "PATCH",
    body: JSON.stringify({
      active: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to update active state");
  }

  return response.json();
};

export const CompletedOrder = ({ orderId, orderItems }: CompletedOrderProp) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateActiveState,
    onMutate: async (orderId) => {
      await queryClient.cancelQueries({ queryKey: ["order"] });
      const prevOrder = queryClient.getQueryData(["order"]) as OrderItem[];
      const existIndex = prevOrder.findIndex((order) => order._id === orderId);

      const updateOrderList = [...prevOrder];

      updateOrderList[existIndex] = {
        ...updateOrderList[existIndex],
        active: true,
      };

      queryClient.setQueryData(["order"], updateOrderList);
      console.log("update order", updateOrderList);

      return { prevOrder };
    },
    onError: (error, deleteItmeId, context) => {
      queryClient.setQueryData(["order"], context?.prevOrder);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });

  const clickHandler = async () => {
    mutation.mutate(orderId);
  };
  return (
    <div
      role="button"
      className="flex flex-col shadow-lg rounded-lg p-4 bg-white gap-2"
    >
      {orderItems &&
        orderItems.map((items) => (
          <div key={items._id} className="flex gap-2">
            <span className="flex-grow-[7] text-lg font-bold">
              {items.name}
            </span>
            <span className="flex-grow-3">{items.quantity} 개</span>
          </div>
        ))}
      <span className="text-right text-lg">
        합계:
        <span className="font-bold">{calcTotalPrice(orderItems)}</span>
      </span>
      <div className="flex gap-4 justify-center items-center">
        <button
          className="w-full bg-[#6E4E39] py-2 px-4 rounded-lg text-white"
          onClick={() => {
            clickHandler();
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
};
