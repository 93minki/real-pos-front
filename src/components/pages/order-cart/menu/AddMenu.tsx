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
import { useState } from "react";

export const AddMenu = () => {
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState(0);

  const buttonClickHandler = async () => {
    const fetchData = await fetch("/api/menu", {
      method: "POST",
      body: JSON.stringify({
        name: menuName,
        price: menuPrice,
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
