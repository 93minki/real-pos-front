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
        <span className="text-2xl font-semibold">주문 현황</span>
      </div>
      <ul className="grid grid-cols-3 gap-4 flex-1 overflow-y-auto p-2">
        {orders.map((order) => {
          return (
            <li key={order.id} className="justify-self-center">
              <div className="relative group">
                {/* 메인 주문 카드 */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                  <OrderCard order={order} />

                  {/* 버튼 영역 */}
                  <div className="px-4 pb-4 bg-white border-t border-gray-100">
                    {/* 수정/삭제 버튼 행 */}
                    <div className="flex gap-2 mb-3 pt-3">
                      <div className="flex-1">
                        <EditOrderDialog
                          orderItems={order.items}
                          orderId={order.id.toString()}
                        />
                      </div>
                      <div className="flex-1">
                        <DeleteOrderButton orderId={order.id.toString()} />
                      </div>
                    </div>

                    {/* 완료 버튼 */}
                    <div className="w-full">
                      <ConfirmOrderButton orderId={order.id.toString()} />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
