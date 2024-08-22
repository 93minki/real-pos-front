import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { calcTotalPrice } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react";
import { OrderItem, OrderItemDatas } from "../type/OrderItem";

interface EditOrderProps {
  orderItems: OrderItemDatas[];
  orderId: string;
}

const editOrderState = async ({
  orderId,
  totalPrice,
  updateOrderItems,
}: {
  orderId: string;
  totalPrice: number;
  updateOrderItems: OrderItemDatas[];
}) => {
  const response = await fetch(`/api/order/${orderId}`, {
    method: "PATCH",
    body: JSON.stringify({
      items: updateOrderItems,
      totalPrice,
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
    onMutate: async (updateItems) => {
      console.log("mutate updateItems", updateItems);
      await queryClient.cancelQueries({ queryKey: ["order"] });
      const prevOrderItems = queryClient.getQueryData(["order"]) as OrderItem[];
      const existIndex = prevOrderItems.findIndex(
        (order) => order._id === orderId
      );

      const updateOrderList = [...prevOrderItems];

      console.log("exist item before", updateOrderList[existIndex].items);

      updateOrderList[existIndex].items = updateItems.updateOrderItems;

      updateOrderList[existIndex] = {
        ...updateOrderList[existIndex],
        items: updateItems.updateOrderItems,
        totalPrice: updateItems.totalPrice,
      };
      console.log("exist item after", updateOrderList[existIndex].items);

      queryClient.setQueryData(["order"], updateOrderList);

      return { prevOrderItems };
    },
    onError: (error, deleteItmeId, context) => {
      queryClient.setQueryData(["order"], context?.prevOrderItems);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const updateOrderItems = orderItems.map((item) => ({
      ...item,
      quantity: data[item.name] as unknown as number,
    }));

    const totalPrice = calcTotalPrice(updateOrderItems);
    console.log("totalPrice", totalPrice);

    mutation.mutate({ orderId, totalPrice, updateOrderItems });
    // const fetchData = await fetch(`/api/order/${orderId}`, {
    //   method: "PATCH",
    //   body: JSON.stringify({
    //     items: updateOrderItems,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const response = await fetchData.json();
    // console.log("response", response);
  };

  return (
    <Dialog>
      <DialogTrigger>수정</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>주문 수정</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <fieldset>
            <legend>주문 목록</legend>
            <div className="flex flex-col gap-2">
              {orderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 justify-start items-center"
                >
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                  <label htmlFor={`${item.name}`}>
                    <input
                      className="border py-2 px-4 rounded-lg"
                      type={"number"}
                      name={`${item.name}`}
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
