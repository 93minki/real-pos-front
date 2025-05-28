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
import { Switch } from "@/components/ui/switch";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MenuItem } from "../type/MenuItem";

interface EditMenuProps {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  is_active: boolean;
}

const editMenuItem = async ({
  id,
  name,
  price,
  category,
  description,
  is_active,
}: EditMenuProps) => {
  const response = await fetchWithAuth(`/api/menu/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
      category,
      description,
      is_active,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to edit menu item");
  }
  return response.json();
};

export const EditMenu = ({
  name,
  price,
  id,
  is_active,
  category,
  description,
}: EditMenuProps) => {
  const [menuName, setMenuName] = useState(name);
  const [menuPrice, setMenuPrice] = useState(price);
  const [menuIsActive, setMenuIsActive] = useState(is_active);
  const [menuCategory, setMenuCategory] = useState(category);
  const [menuDescription, setMenuDescription] = useState(description);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editMenuItem,
    onMutate: async (editItem) => {
      await queryClient.cancelQueries({ queryKey: ["menu-list"] });

      const prevMenuItem = queryClient.getQueryData([
        "menu-list",
      ]) as MenuItem[];
      const existIndex = prevMenuItem.findIndex(
        (item) => item.id === editItem.id
      );
      const updateMenuItems = [...prevMenuItem];

      updateMenuItems[existIndex] = {
        ...updateMenuItems[existIndex],
        name: editItem.name,
        price: editItem.price,
        is_active: editItem.is_active ? 1 : 0,
        category: editItem.category,
        description: editItem.description,
      };

      queryClient.setQueryData(["menu-list"], updateMenuItems);

      return { prevMenuItem };
    },
    onError: (error, editItem, context) => {
      queryClient.setQueryData(["menu-list"], context?.prevMenuItem);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-list"] });
    },
  });

  const buttonClickHandler = async () => {
    mutation.mutate({
      id,
      name: menuName,
      price: menuPrice,
      is_active: menuIsActive,
      category: menuCategory,
      description: menuDescription,
    });
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
          <DialogDescription></DialogDescription>
          <DialogTitle>메뉴 수정 </DialogTitle>
          <Switch
            id="is_active"
            checked={menuIsActive}
            onCheckedChange={setMenuIsActive}
            className="data-[state=checked]:bg-green-500 mr-4"
          />
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
          <input
            type="text"
            placeholder="카테고리"
            className="px-4 py-2"
            value={menuCategory}
            onChange={(e) => setMenuCategory(e.currentTarget.value)}
          />
          <input
            type="text"
            placeholder="설명"
            className="px-4 py-2"
            value={menuDescription}
            onChange={(e) => setMenuDescription(e.currentTarget.value)}
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
