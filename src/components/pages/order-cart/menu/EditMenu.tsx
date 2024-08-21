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
import { useMenuStore } from "@/provider/menu-store-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface EditMenuProps {
  name: string;
  price: number;
  id: string;
}

const editMenuItem = async ({
  id,
  name,
  price,
}: {
  id: string;
  name: string;
  price: number;
}) => {
  const response = await fetch(`/api/menu/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to edit menu item");
  }
  return response.json();
};

export const EditMenu = ({ name, price, id }: EditMenuProps) => {
  const [menuName, setMenuName] = useState(name);
  const [menuPrice, setMenuPrice] = useState(price);
  const { menuItems, setMenuItems } = useMenuStore((state) => state);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    },
  });

  const buttonClickHandler = async () => {
    mutation.mutate({ id, name: menuName, price: menuPrice });
    if (mutation.isSuccess) {
      const existIndex = menuItems.findIndex(
        (item) => item._id === mutation.data._id
      );
      const updateMenuItems = [...menuItems];
      updateMenuItems[existIndex].name = menuName;
      updateMenuItems[existIndex].price = menuPrice;
      setMenuItems(updateMenuItems);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant={"outline"}>
          수정
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="메뉴 이름"
            className="px-4 py-2"
            value={menuName}
            onChange={(e) => setMenuName(e.currentTarget.value)}
          />
          <input
            type="number"
            placeholder="가격"
            className="px-4 py-2"
            value={menuPrice}
            onChange={(e) => setMenuPrice(+e.currentTarget.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={"secondary"}>
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant={"default"}
              onClick={() => {
                buttonClickHandler();
              }}
              disabled={mutation.isPending}
            >
              수정
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
