import { OrderCard } from "@/entities";
import { OrderType } from "@/shared/types";

interface ConfirmedOrderListProps {
  orders: OrderType[];
}

export const ConfirmedOrderList = ({ orders }: ConfirmedOrderListProps) => {
  return (
    <div className="flex flex-col flex-grow-[5] basis-[50%] max-w-[50%] min-w-[50%] h-[calc(100vh-120px)] gap-4">
      <div className="flex items-center justify-center relative px-2 py-4 bg-[#FDEACA] rounded-lg shrink-0">
        <span className="text-2xl">완료된 주문</span>
      </div>
      <ul className="grid grid-cols-3 gap-4 flex-1 overflow-y-auto">
        {orders.map((order) => {
          return (
            <li key={order.id}>
              <OrderCard order={order} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
