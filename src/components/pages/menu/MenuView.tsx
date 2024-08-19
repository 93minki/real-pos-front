"use client";
import { MenuCard } from "./MenuCard";

type MenuItemsType = {
  name: string;
  price: number;
  enable: boolean;
}[];

const MENU_ITEMS: MenuItemsType = [
  {
    name: "item1",
    price: 4000,
    enable: true,
  },
  {
    name: "item2",
    price: 3000,
    enable: true,
  },
  {
    name: "item3",
    price: 3000,
    enable: true,
  },
  {
    name: "item4",
    price: 3000,
    enable: true,
  },
  {
    name: "item5",
    price: 3000,
    enable: true,
  },
  {
    name: "item6",
    price: 3000,
    enable: true,
  },
];

export const MenuView = () => {
  return (
    <div className="flex-grow-[8] pr-8">
      <ul className="grid grid-cols-5 gap-4">
        {MENU_ITEMS.map((item) => (
          <li key={item.name} className="">
            <MenuCard name={item.name} price={item.price} />
          </li>
        ))}
      </ul>
    </div>
  );
};
