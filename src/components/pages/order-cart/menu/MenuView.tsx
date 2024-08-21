"use client";
import { useMenuStore } from "@/provider/menu-store-provider";
import { MenuItem } from "@/store/menu-store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MenuCard } from "./MenuCard";

export const MenuView = () => {
  const [menuEditMode, setMenuEditMode] = useState(false);

  const { menuItems, setMenuItems } = useMenuStore((state) => state);

  const { isPending, error, data, isLoading } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const fetchData = await fetch("/api/menu");
      const response: { data: MenuItem[] } = await fetchData.json();
      setMenuItems(response.data);
      return response.data;
    },
  });

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="flex-grow-[8] basis-[80%] max-w-[80%] min-w-[80%] pr-8 ">
      <button onClick={() => setMenuEditMode(!menuEditMode)}>
        toggle edit mode
      </button>
      <ul className="grid grid-cols-5 gap-4">
        {menuItems &&
          menuItems.map((menu) => {
            return (
              menu.active && (
                <li key={menu._id} className="">
                  <MenuCard
                    name={menu.name}
                    price={menu.price}
                    id={menu._id}
                    editMode={menuEditMode}
                  />
                </li>
              )
            );
          })}
      </ul>
    </div>
  );
};
