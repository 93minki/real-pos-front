import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderItemDatas, OrderListItems } from "../type/OrderItem";
import { DeleteOrder } from "./DeleteOrder";
import { EditOrder } from "./EditOrder";

interface OrderProps {
  orderItems: OrderItemDatas[];
  orderId: string;
}

const updateActiveState = async (orderId: string) => {
  const response = await fetch(`/api/order/${orderId}/complete`, {
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
      await queryClient.cancelQueries({ queryKey: ["order-list"] });
      const prevOrder = queryClient.getQueryData([
        "order-list",
      ]) as OrderListItems[];
      const existIndex = prevOrder.findIndex(
        (order) => order.id.toString() === orderId
      );

      const updateOrderList = [...prevOrder];

      updateOrderList[existIndex] = {
        ...updateOrderList[existIndex],
        status: "COMPLETED",
      };

      queryClient.setQueryData(["order-list"], updateOrderList);

      return { prevOrder };
    },
    onError: (error, deleteItmeId, context) => {
      queryClient.setQueryData(["order-list"], context?.prevOrder);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["order-list"] });
    },
  });

  const clickHandler = async () => {
    mutation.mutate(orderId);
  };

  return (
    <div className="flex flex-col shadow-lg rounded-lg p-4 bg-white gap-2 w-[230px]">
      <div className="flex flex-col gap-2 overflow-y-auto h-[150px]">
        {orderItems.map((items) => (
          <div key={items.id} className="flex gap-2">
            <span className="flex-grow-[7] text-lg font-bold">
              {items.menu.name}
            </span>
            <span className="flex-grow-3">{items.quantity} 개</span>
          </div>
        ))}
      </div>
      <span className="text-right text-lg">
        합계:
        <span className="font-bold">
          {orderItems.reduce((acc, cur) => acc + cur.price, 0)}
        </span>
      </span>
      <div className="flex gap-2 justify-center items-center">
        <EditOrder orderItems={orderItems} orderId={orderId} />
        <DeleteOrder id={orderId} />
      </div>
      <div className="flex gap-4 justify-center items-center">
        <button
          className="w-full bg-[#6E4E39] py-2 px-4 rounded-lg text-white"
          onClick={() => {
            clickHandler();
          }}
        >
          완료
        </button>
      </div>
    </div>
  );
};
