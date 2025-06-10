import { OrderCard } from "@/entities";
import {
  ConfirmOrderButton,
  DeleteOrderButton,
  EditOrderDialog,
} from "@/features";
import { OrderType } from "@/shared/types";

interface InprogressOrderListProps {
  orders: OrderType[];
}

export const InprogressOrderList = ({ orders }: InprogressOrderListProps) => {
  return (
    <div className="flex flex-col flex-grow-[5] basis-[50%] max-w-[50%] min-w-[50%] h-[calc(100vh-120px)] gap-4">
      <div className="flex items-center justify-center relative px-2 py-4 bg-[#FDEACA] rounded-lg shrink-0">
        <span className="text-2xl">주문 현황</span>
      </div>
      <ul className="grid grid-cols-3 gap-2 flex-1 overflow-y-auto">
        {orders.map((order) => {
          return (
            <li key={order.id} className="justify-self-center">
              <div className="flex flex-col shadow-lg rounded-lg p-4 bg-white gap-2 w-[230px]">
                <OrderCard orderItems={order.items} />
                <div className="flex gap-2 justify-center items-center">
                  <EditOrderDialog
                    orderItems={order.items}
                    orderId={order.id.toString()}
                  />
                  <DeleteOrderButton orderId={order.id.toString()} />
                </div>
                <div className="flex gap-4 justify-center items-center">
                  <ConfirmOrderButton orderId={order.id.toString()} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
