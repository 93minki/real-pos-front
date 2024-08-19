import { EditOrder } from "./EditOrder";

interface OrderProps {
  orderItems: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
}

export const Order = ({ orderItems, totalPrice }: OrderProps) => {
  return (
    <div className="flex flex-col shadow-lg rounded-lg p-4">
      {orderItems.map((items) => (
        <div key={items.name} className="flex gap-2">
          <span>{items.name}</span>
          <span>{items.quantity}</span>
        </div>
      ))}
      <span>합계:{totalPrice}</span>
      <div className="flex gap-4 justify-center items-center">
        <button>완료</button>
      </div>
      <EditOrder orderItems={orderItems} />
    </div>
  );
};
