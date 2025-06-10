import { OrderCard } from "@/entities";
import { OrderType } from "@/shared/types";

interface ConfirmedOrderListProps {
  orders: OrderType[];
}

export const ConfirmedOrderList = ({ orders }: ConfirmedOrderListProps) => {
  return (
    <div className="flex flex-col flex-grow-[5] basis-[50%] max-w-[50%] min-w-[50%] h-[calc(100vh-120px)] gap-4">
      <div className="flex items-center justify-center relative px-2 py-4 bg-[#FDEACA] rounded-lg shrink-0">
        <span className="text-2xl font-semibold">완료된 주문</span>
      </div>
      <ul className="grid grid-cols-3 gap-4 flex-1 overflow-y-auto p-2">
        {orders.map((order) => {
          return (
            <li key={order.id} className="justify-self-center">
              <div className="relative group">
                {/* 메인 주문 카드 */}
                <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-green-200 overflow-hidden">
                  <OrderCard order={order} />

                  {/* 완료 표시 영역 */}
                  <div className="px-4 pb-3 bg-gradient-to-r from-green-50 to-green-100 border-t border-green-200">
                    <div className="flex items-center justify-center py-2">
                      <div className="flex items-center gap-2 text-green-700">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-semibold text-sm">완료됨</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 완료 상태 표시 */}
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                  완료
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
