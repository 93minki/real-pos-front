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
import { useMenuStore } from "@/provider/menu-store-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const uploadMenuItem = async ({
  name,
  price,
}: {
  name: string;
  price: number;
}) => {
  const response = await fetch("/api/menu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, price }),
  });

  if (!response.ok) {
    throw new Error("Failed to add menu item");
  }

  return response.json();
};

export const AddMenu = () => {
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState(0);
  const { addMenuItem } = useMenuStore((state) => state);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    },
  });

  const buttonClickHandler = () => {
    mutation.mutate({ name: menuName, price: menuPrice });
    if (mutation.isSuccess) {
      addMenuItem(mutation.data);
    }
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
          <DialogTitle>새로운 메뉴 추가하기</DialogTitle>
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
              추가
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
