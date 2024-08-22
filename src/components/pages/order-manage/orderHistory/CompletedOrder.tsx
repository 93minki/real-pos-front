"use client";

import { calcTotalPrice } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderItem, OrderItemDatas } from "../type/OrderItem";

interface CompletedOrderProp {
  orderItems: OrderItemDatas[];
  orderId: string;
}

const deleteOrder = async (id: string) => {
  const response = await fetch(`/api/order/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete order item");
  }
  return response.json();
};

export const CompletedOrder = ({ orderId, orderItems }: CompletedOrderProp) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteOrder,
    onMutate: async (orderId) => {
      await queryClient.cancelQueries({ queryKey: ["order"] });

      const prevOrderList = queryClient.getQueryData(["order"]) as OrderItem[];
      const updateOrderList = prevOrderList.filter(
        (order) => order._id !== orderId
      );

      queryClient.setQueryData(["order"], updateOrderList);

      return { prevOrderList };
    },
    onError: (error, deleteItmeId, context) => {
      queryClient.setQueryData(["order"], context?.prevOrderList);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });

  const clickHandler = async () => {
    mutation.mutate(orderId);
  };

  return (
    <div role="button" className="flex flex-col shadow-lg rounded-lg p-4">
      {orderItems.map((items) => (
        <div key={items._id} className="flex gap-2">
          <span>{items.name}</span>
          <span>{items.quantity}</span>
        </div>
      ))}
      <span>합계:{calcTotalPrice(orderItems)}</span>
      <div className="flex gap-4 justify-center items-center">
        <button
          onClick={() => {
            clickHandler();
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
};
