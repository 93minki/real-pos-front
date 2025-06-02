import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/provider/order-store-provider";
import { EditMenu } from "./EditMenu";

interface MenuCardProps {
  name: string;
  price: number;
  id: number;
  is_active: boolean;
  editMode: boolean;
  category: string | null;
  description: string | null;
}

export const MenuCard = ({
  name,
  price,
  id,
  is_active,
  editMode,
  category,
  description,
}: MenuCardProps) => {
  const { addOrder } = useOrderStore((state) => state);
  return (
    <div
      className={`flex flex-col rounded-lg shadow-lg p-4 justify-center items-center gap-4 ${
        is_active ? "bg-white" : "bg-slate-400"
      } `}
    >
      <span className="text-xl font-bold">{name}</span>
      <span className="text-lg">{price}원</span>
      {editMode ? (
        <div className="flex gap-4">
          <EditMenu
            name={name}
            price={price}
            id={id}
            is_active={is_active}
            category={category || ""}
            description={description || ""}
          />
        </div>
      ) : (
        <Button
          disabled={editMode}
          onClick={(e) => {
            if (!editMode) {
              addOrder({ id, name, price, quantity: 1 });
            }
          }}
        >
          추가
        </Button>
      )}
    </div>
  );
};
