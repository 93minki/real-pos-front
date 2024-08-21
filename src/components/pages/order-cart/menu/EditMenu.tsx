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
import { useState } from "react";

interface EditMenuProps {
  name: string;
  price: number;
  id: string;
}

export const EditMenu = ({ name, price, id }: EditMenuProps) => {
  const [menuName, setMenuName] = useState(name);
  const [menuPrice, setMenuPrice] = useState(price);

  const { menuItems, setMenuItems } = useMenuStore((state) => state);

  const buttonClickHandler = async () => {
    const fetchData = await fetch(`/api/menu/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        menuName,
        menuPrice,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await fetchData.json();
    const existIndex = menuItems.findIndex(
      (item) => item._id === response.data._id
    );
    const updateMenuItems = [...menuItems];
    updateMenuItems[existIndex].name = menuName;
    updateMenuItems[existIndex].price = menuPrice;
    setMenuItems(updateMenuItems);
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
            >
              수정
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
