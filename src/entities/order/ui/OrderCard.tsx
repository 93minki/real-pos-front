import { OrderItemType } from "@/shared/types";

interface OrderCardProps {
  orderItems: OrderItemType[];
}

export const OrderCard = ({ orderItems }: OrderCardProps) => {
  return (
    <>
      <div className="flex flex-col gap-2 overflow-y-auto h-[150px]">
        {orderItems.map((items) => (
          <div key={items.id} className="flex gap-2">
            <span className="flex-grow-[7] text-lg font-bold">
              {items.menu.name}
            </span>
            <span className="flex-grow-3">{items.quantity} 개</span>
          </div>
        ))}
      </div>
      <span className="text-right text-lg">
        합계:
        <span className="font-bold">
          {orderItems.reduce((acc, cur) => acc + cur.price, 0)}
        </span>
      </span>
    </>
  );
};
