import { calcTotalPrice } from "@/lib/utils";
import { DeleteOrder } from "./DeleteOrder";
import { EditOrder } from "./EditOrder";
import { OrderItemDatas } from "./OrderList";

interface OrderProps {
  orderItems: OrderItemDatas[];
  orderId: string;
}

export const Order = ({ orderItems, orderId }: OrderProps) => {
  const clickHandler = async () => {
    const fetchData = await fetch(`/api/order/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({
        active: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await fetchData.json();
    console.log("response", response);
  };

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
        <button
          onClick={() => {
            clickHandler();
          }}
        >
          완료
        </button>
      </div>
      <DeleteOrder id={orderId} />
      <EditOrder orderItems={orderItems} orderId={orderId} />
    </div>
  );
};
