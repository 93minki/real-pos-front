"use client";
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
import { Switch } from "@/components/ui/switch";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MenuItem } from "../type/MenuItem";

const uploadMenuItem = async ({
  name,
  price,
  description,
  category,
  is_active,
}: {
  name: string;
  price: number;
  description: string;
  category: string;
  is_active: boolean;
}) => {
  const response = await fetchWithAuth("/api/menu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, price, description, category, is_active }),
  });

  if (!response.ok) {
    throw new Error("Failed to add menu item");
  }

  return response.json();
};

export const AddMenu = () => {
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState(0);
  const [menuDescription, setMenuDescription] = useState("");
  const [menuCategory, setMenuCategory] = useState("");
  const [menuIsActive, setMenuIsActive] = useState(true);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadMenuItem,
    onMutate: async (newMenu) => {
      await queryClient.cancelQueries({ queryKey: ["menu-list"] });
      const prevMenuItem = queryClient.getQueryData(["menu-list"]);
      queryClient.setQueryData(["menu-list"], (prev: MenuItem[]) => [
        ...prev,
        { ...newMenu, id: uuidv4() },
      ]);
      return { prevMenuItem };
    },
    onError: (err, newMenu, context) => {
      queryClient.setQueryData(["menu-list"], context?.prevMenuItem);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-list"] });
    },
  });

  const buttonClickHandler = () => {
    mutation.mutate({
      name: menuName,
      price: menuPrice,
      description: menuDescription,
      category: menuCategory,
      is_active: menuIsActive,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant={"default"}>
          메뉴 추가
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>새로운 메뉴 추가하기</DialogTitle>
            <Switch
              id="is_active"
              checked={menuIsActive}
              onCheckedChange={setMenuIsActive}
              className="data-[state=checked]:bg-green-500 mr-4"
            />
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="메뉴 이름"
            className="px-4 py-2"
            onChange={(e) => setMenuName(e.currentTarget.value)}
          />
          <input
            type="number"
            placeholder="가격"
            className="px-4 py-2"
            onChange={(e) => setMenuPrice(+e.currentTarget.value)}
          />
          <input
            type="text"
            placeholder="카테고리"
            className="px-4 py-2"
            onChange={(e) => setMenuCategory(e.currentTarget.value)}
          />
          <input
            type="text"
            placeholder="설명"
            className="px-4 py-2"
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
              추가
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
