"use client";
import { Toggle } from "@/components/ui/toggle";
import { useQuery } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { useState } from "react";
import { AddMenu } from "./AddMenu";
import { MenuCard } from "./MenuCard";
import { MenuItem } from "./type/MenuItem";

export const MenuView = () => {
  const [menuEditMode, setMenuEditMode] = useState(false);

  const { isPending, error, data, isLoading } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const fetchData = await fetch("/api/menu");
      const response: { data: MenuItem[] } = await fetchData.json();
      return response.data;
    },
  });

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="flex-grow-[8] basis-[80%] max-w-[80%] min-w-[80%] pr-8 ">
      <Toggle
        onPressedChange={(e) => setMenuEditMode(e)}
        pressed={menuEditMode}
      >
        <Settings />
      </Toggle>
      {menuEditMode && <AddMenu />}

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
