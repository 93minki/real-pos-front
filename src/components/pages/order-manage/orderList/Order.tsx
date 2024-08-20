import { calcTotalPrice } from "@/lib/utils";
import { EditOrder } from "./EditOrder";
import { OrderItemDatas } from "./OrderList";

interface OrderProps {
  orderItems: OrderItemDatas[];
  orderId: string;
}

export const Order = ({ orderItems, orderId }: OrderProps) => {
  return (
    <div role="button" className="flex flex-col shadow-lg rounded-lg p-4">
      {orderItems.map((items) => (
        <div key={items._id} className="flex gap-2">
          <span>{items.name}</span>
          <span>{items.quantity}</span>
        </div>
      ))}
      <span>합계:{calcTotalPrice(orderItems)}</span>
      <div className="flex gap-4 justify-center items-center">
        <button>완료</button>
      </div>
      <EditOrder orderItems={orderItems} orderId={orderId} />
    </div>
  );
};
