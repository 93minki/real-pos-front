"use client";
import { useEffect, useState } from "react";
import { MenuCard } from "./MenuCard";

type MenuItemsType = {
  createdAt: string;
  enable: boolean;
  name: string;
  price: number;
  updatedAt: string;
  __v: number;
  _id: string;
};

export const MenuView = () => {
  const [menuList, setMenuList] = useState<MenuItemsType[] | null>();

  useEffect(() => {
    const getMenuItems = async () => {
      const fetchData = await fetch("/api/menu");
      const response: { data: MenuItemsType[] } = await fetchData.json();
      setMenuList(response.data);
    };
    getMenuItems();
  }, []);

  return (
    <div className="flex-grow-[8] basis-[80%] max-w-[80%] min-w-[80%] pr-8 ">
      <ul className="grid grid-cols-5 gap-4">
        {menuList &&
          menuList.map((menu) => {
            return (
              menu.enable && (
                <li key={menu._id} className="">
                  <MenuCard name={menu.name} price={menu.price} />
                </li>
              )
            );
          })}
      </ul>
    </div>
  );
};
