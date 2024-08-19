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

interface EditOrderProps {
  orderItems: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

export const EditOrder = ({ orderItems }: EditOrderProps) => {
  return (
    <Dialog>
      <DialogTrigger>수정</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>주문 수정</DialogTitle>
        </DialogHeader>
        {orderItems.map((item) => (
          <div key={item.name} className="flex flex-col">
            <div className="flex gap-4">
              <span>{item.name}</span>
              <span>{item.price}</span>
            </div>
            <input type="number" value={item.quantity} />

            <span>total: {item.price * item.quantity}</span>
          </div>
        ))}

        <DialogFooter>
          <Button type="button" variant={"default"}>
            변경하기
          </Button>
          <DialogClose asChild>
            <Button type="button" variant={"secondary"}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
