import { Button } from "@/components/ui/button";
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
      className={`flex flex-col rounded-lg shadow-lg p-4 justify-center items-center gap-4 ${
        active ? "bg-white" : "bg-slate-400"
      } `}
    >
      <span className="text-xl font-bold">{name}</span>
      <span className="text-lg">{price}원</span>
      {editMode && (
        <div className="flex gap-4">
          <EditMenu name={name} price={price} id={id} active={active} />
          <DeleteMenu id={id} />
        </div>
      )}
      <Button
        disabled={editMode}
        onClick={(e) => {
          if (!editMode) {
            addOrder({ name, price, quantity: 1 });
          }
        }}
      >
        추가하기
      </Button>
    </div>
  );
};
// ECB176 6F4E37
