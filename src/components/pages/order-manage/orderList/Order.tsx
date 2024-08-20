import { OrderItems } from "@/store/order-store";
import { EditOrder } from "./EditOrder";

interface OrderProps {
  orderItems: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

export const Order = ({ orderItems }: OrderProps) => {
  const calcTotalPrice = (orderItems: OrderItems[]) => {
    const totalPrice = orderItems.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);
    return totalPrice;
  };

  return (
    <div role="button" className="flex flex-col shadow-lg rounded-lg p-4">
      {orderItems.map((items) => (
        <div key={items.name} className="flex gap-2">
          <span>{items.name}</span>
          <span>{items.quantity}</span>
        </div>
      ))}
      <span>합계:{calcTotalPrice(orderItems)}</span>
      <div className="flex gap-4 justify-center items-center">
        <button>완료</button>
      </div>
      <EditOrder orderItems={orderItems} />
    </div>
  );
};
