import { calcTotalPrice } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderItem, OrderItemDatas } from "../type/OrderItem";
import { EditOrder } from "./EditOrder";

interface OrderProps {
  orderItems: OrderItemDatas[];
  orderId: string;
}

const updateActiveState = async (orderId: string) => {
  const response = await fetch(`/api/order/${orderId}`, {
    method: "PATCH",
    body: JSON.stringify({
      active: false,
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

export const Order = ({ orderItems, orderId }: OrderProps) => {
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
        active: false,
      };

      queryClient.setQueryData(["order"], updateOrderList);

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
          완료
        </button>
      </div>
      <EditOrder orderItems={orderItems} orderId={orderId} />
    </div>
  );
};
