import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react";
import { OrderItemDatas, OrderListItems } from "../type/OrderItem";

interface EditOrderProps {
  orderItems: OrderItemDatas[];
  orderId: string;
}

const editOrderState = async ({
  orderId,
  updateOrderItems,
}: {
  orderId: string;
  updateOrderItems: OrderItemDatas[];
}) => {
  const items = updateOrderItems.map((item) => ({
    menuId: item.menu.id,
    quantity: item.menu.quantity,
    price: item.menu.price,
  }));

  const response = await fetchWithAuth(`/api/order/${orderId}`, {
    method: "PATCH",
    body: JSON.stringify({
      items,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to update orderItem state");
  }
  return response.json();
};

export const EditOrder = ({ orderItems, orderId }: EditOrderProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editOrderState,
    onMutate: async (updateItem) => {
      await queryClient.cancelQueries({ queryKey: ["order-list"] });

      const prevOrderItems = queryClient.getQueryData([
        "order-list",
      ]) as OrderListItems[];
      const existIndex = prevOrderItems.findIndex(
        (order) => order.id.toString() === updateItem.orderId
      );
      const updateOrderList = [...prevOrderItems];

      updateOrderList[existIndex] = {
        ...updateOrderList[existIndex],
        items: updateItem.updateOrderItems,
      };

      queryClient.setQueryData(["order-list"], updateOrderList);

      return { prevOrderItems };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["order-list"] });
    },
    onError: (error, updateOrderId, context) => {
      console.error("Failed to update:", error);
      queryClient.setQueryData(["order-list"], context?.prevOrderItems);
    },
  });

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const updateOrderItems = orderItems.map((item) => ({
      ...item,
      quantity: Number(data[item.menu.name]),
    }));
    mutation.mutate({ orderId, updateOrderItems });
  };

  return (
    <Dialog>
      <DialogTrigger>수정</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>주문 수정</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <fieldset>
            <legend>주문 목록</legend>
            <div className="flex flex-col gap-2">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 justify-start items-center"
                >
                  <span>{item.menu.name}</span>
                  <span>{item.menu.price}</span>
                  <label htmlFor={`${item.menu.name}`}>
                    <input
                      className="border py-2 px-4 rounded-lg"
                      type={"number"}
                      name={`${item.menu.name}`}
                      defaultValue={item.quantity}
                    />
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant={"secondary"}>
                취소
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" variant={"default"}>
                변경하기
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
