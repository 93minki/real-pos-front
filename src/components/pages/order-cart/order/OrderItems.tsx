import { SquareX } from "lucide-react";

interface OrderItemsProps {
  name: string;
  quantity: number;
  upCount: (name: string) => void;
  downCount: (name: string) => void;
  deleteItem: (name: string) => void;
}

export const OrderItems = ({
  name,
  quantity,
  upCount,
  downCount,
  deleteItem,
}: OrderItemsProps) => {
  return (
    <div className="flex flex-col gap-2 border justify-center items-center py-2 relative">
      <span>{name}</span>
      <div className="flex gap-4 ">
        <button
          className="border px-2"
          onClick={() => {
            downCount(name);
          }}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="border px-2"
          onClick={() => {
            upCount(name);
          }}
        >
          +
        </button>

        <SquareX
          className="absolute right-0 bottom-0"
          onClick={() => {
            deleteItem(name);
          }}
        />
      </div>
    </div>
  );
};
