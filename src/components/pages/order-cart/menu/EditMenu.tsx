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

interface EditMenuProps {
  name: string;
  price: number;
}

export const EditMenu = ({ name, price }: EditMenuProps) => {
  return (
    <Dialog>
      <DialogTrigger>수정</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <input type="text" placeholder="변경할 이름" />
        <input type="number" placeholder="가격" />
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
