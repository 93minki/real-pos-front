"use client";
import { useEffect, useState } from "react";
import { MenuCard } from "./MenuCard";

type MenuItemsType = {
  createdAt: string;
  active: boolean;
  name: string;
  price: number;
  updatedAt: string;
  __v: number;
  _id: string;
};

export const MenuView = () => {
  const [menuList, setMenuList] = useState<MenuItemsType[] | null>();
  const [menuEditMode, setMenuEditMode] = useState(false);

  useEffect(() => {
    const getMenuItems = async () => {
      const fetchData = await fetch("/api/menu");
      const response: { data: MenuItemsType[] } = await fetchData.json();
      console.log("response", response.data);
      setMenuList(response.data);
    };
    getMenuItems();
  }, []);

  return (
    <div className="flex-grow-[8] basis-[80%] max-w-[80%] min-w-[80%] pr-8 ">
      <button onClick={() => setMenuEditMode(!menuEditMode)}>
        toggle edit mode
      </button>
      <ul className="grid grid-cols-5 gap-4">
        {menuList &&
          menuList.map((menu) => {
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
