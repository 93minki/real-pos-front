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
import { FormEvent } from "react";
import { OrderItemDatas } from "./type/OrderItem";

interface EditOrderProps {
  orderItems: OrderItemDatas[];
  orderId: string;
}

// name: string;
//   price: number;
//   quantity: number;

export const EditOrder = ({ orderItems, orderId }: EditOrderProps) => {
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const updateOrderItems = orderItems.map(({ _id, ...rest }) => ({
      ...rest,
      quantity: data[rest.name],
    }));

    const fetchData = await fetch(`/api/order/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({
        items: updateOrderItems,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await fetchData.json();
    console.log("response", response);
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
