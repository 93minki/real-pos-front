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
import { MenuItem } from "@/store/menu-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const uploadMenuItem = async ({
  name,
  price,
}: {
  name: string;
  price: number;
}) => {
  const response = await fetch("/api/menu2", {
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
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadMenuItem,
    onMutate: async (newMenu) => {
      await queryClient.cancelQueries({ queryKey: ["menu"] });

      const prevMenuItem = queryClient.getQueryData(["menu"]);

      // NOTE: 낙관적 업데이트를 위해 name, price를 제외한 나머지 데이터는 fake 데이터
      queryClient.setQueryData(["menu"], (prev: MenuItem[]) => [
        ...prev,
        {
          ...newMenu,
          active: true,
          _id: "fakeId",
          __v: 0,
          createdAt: "fakeCreatedAt",
          updatedAt: "fakeUpdatedAt",
        },
        ,
      ]);

      return { prevMenuItem };
    },
    onError: (err, newMenu, context) => {
      queryClient.setQueryData(["menu"], context?.prevMenuItem);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    },
  });

  const buttonClickHandler = () => {
    mutation.mutate({ name: menuName, price: menuPrice });
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
