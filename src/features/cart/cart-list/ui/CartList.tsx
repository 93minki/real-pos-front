import { CartItem } from "@/entities";
import { OrderItemsType, useOrderStore } from "@/shared/lib/order-store";

interface CartListProps {
  orderItems: OrderItemsType[];
}

export const CartList = ({ orderItems }: CartListProps) => {
  const { increaseOrderCount, decreaseOrderCount } = useOrderStore(
    (state) => state
  );

  return (
    <div className="flex flex-col overflow-y-auto flex-grow py-4 gap-2">
      {orderItems.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            quantity={item.quantity}
            onIncrease={increaseOrderCount}
            onDecrease={decreaseOrderCount}
          />
        );
      })}
    </div>
  );
};
