import { OrderItem } from "@/entities";
import { OrderItemsType } from "@/lib/order-store";

interface MenuCartListProps {
  orderItems: OrderItemsType[];
  increaseOrderCount: (id: number) => void;
  decreaseOrderCount: (id: number) => void;
}
export const MenuCartList = ({
  orderItems,
  increaseOrderCount,
  decreaseOrderCount,
}: MenuCartListProps) => {
  const upCount = (id: number) => {
    increaseOrderCount(id);
  };
  const downCount = (id: number) => {
    decreaseOrderCount(id);
  };

  return (
    <div className="flex flex-col overflow-y-auto flex-grow py-4 gap-2">
      {orderItems.map((item) => {
        return (
          <OrderItem
            id={item.id}
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            downCount={downCount}
            upCount={upCount}
          />
        );
      })}
    </div>
  );
};
