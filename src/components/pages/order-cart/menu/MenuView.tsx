"use client";
import { Toggle } from "@/components/ui/toggle";
import { useOrderStore } from "@/provider/order-store-provider";
import { useQuery } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { useState } from "react";
import { MenuItem } from "../type/MenuItem";
import { AddMenu } from "./AddMenu";
import { MenuCard } from "./MenuCard";

export const MenuView = () => {
  const [menuEditMode, setMenuEditMode] = useState(false);
  const { reset } = useOrderStore((state) => state);

  const { isPending, error, data, isLoading } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const fetchData = await fetch("/api/menu");
      const response: { data: MenuItem[] } = await fetchData.json();
      return response.data;
    },
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>메뉴 가져오는데 실패했습니다...</div>;

  return (
    <div className="flex-grow-[8] basis-[80%] max-w-[80%] min-w-[80%] pr-8 flex flex-col gap-8 border-r">
      <div className="flex items-center justify-center relative px-2 py-4 bg-[#FDEACA] rounded-lg">
        <span className="text-2xl">메뉴 리스트</span>
        <div className="absolute right-5 flex items-center justify-center gap-2">
          {menuEditMode && <AddMenu />}
          <Toggle
            variant={"default"}
            onPressedChange={(e) => {
              setMenuEditMode(e);
              reset();
            }}
            pressed={menuEditMode}
          >
            <Settings />
          </Toggle>
        </div>
      </div>

      <ul className="grid grid-cols-5 gap-4">
        {data &&
          data.map((menu) => {
            if (menuEditMode || menu.active) {
              return (
                <li key={menu._id}>
                  <MenuCard
                    name={menu.name}
                    price={menu.price}
                    id={menu._id}
                    active={menu.active}
                    editMode={menuEditMode}
                  />
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
};
