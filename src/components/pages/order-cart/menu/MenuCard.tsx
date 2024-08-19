import { useOrderStore } from "@/provider/order-store-provider";

interface MenuCardProps {
  name: string;
  price: number;
}

export const MenuCard = ({ name, price }: MenuCardProps) => {
  const { addOrder } = useOrderStore((state) => state);

  return (
    <div
      role="button"
      className="flex flex-col rounded-lg shadow-md p-4 justify-center items-center"
      onClick={(e) => {
        addOrder({ name, price, quantity: 1 });
      }}
    >
      <span>{name}</span>
      <span>{price}</span>
    </div>
  );
};
