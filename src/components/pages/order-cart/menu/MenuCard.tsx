import { useOrderStore } from "@/provider/order-store-provider";
import { DeleteMenu } from "./DeleteMenu";
import { EditMenu } from "./EditMenu";

interface MenuCardProps {
  name: string;
  price: number;
  id: string;
  active: boolean;
  editMode: boolean;
}

export const MenuCard = ({
  name,
  price,
  id,
  active,
  editMode,
}: MenuCardProps) => {
  const { addOrder } = useOrderStore((state) => state);
  return (
    <div
      role="button"
      className={`flex flex-col rounded-lg shadow-md p-4 justify-center items-center ${
        active ? "bg-white" : "bg-slate-400"
      } `}
      aria-disabled={editMode}
      onClick={(e) => {
        if (!editMode) {
          addOrder({ name, price, quantity: 1 });
        }
      }}
    >
      <span>{name}</span>
      <span>{price}</span>
      {editMode && (
        <>
          <EditMenu name={name} price={price} id={id} active={active} />
          <DeleteMenu id={id} />
        </>
      )}
    </div>
  );
};
