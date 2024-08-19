import { MouseEvent } from "react";

interface MenuCardProps {
  name: string;
  price: number;
  onClickHandler: (e: MouseEvent<HTMLDivElement>) => void;
}

export const MenuCard = ({ name, price, onClickHandler }: MenuCardProps) => {
  return (
    <div
      role="button"
      className="flex flex-col rounded-lg shadow-md p-4 justify-center items-center"
      onClick={(e) => onClickHandler(e)}
    >
      <span>{name}</span>
      <span>{price}</span>
    </div>
  );
};
