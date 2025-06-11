import { OrderCard } from "@/entities";
import { OrderType } from "@/shared/types";

interface ConfirmedOrderListProps {
  orders: OrderType[];
  layout: "expanded" | "compact";
}

export const ConfirmedOrderList = ({
  orders,
  layout,
}: ConfirmedOrderListProps) => {
  const gridStyle = {
    expanded: "grid-cols-1 narrow:grid-cols-3 mid:grid-cols-4 wide:grid-cols-5",
    compact: "grid-cols-3",
  };

  return (
    <div className="flex flex-col flex-grow-[5] basis-[50%] h-[calc(100vh-120px)] gap-4">
      <div className="flex items-center justify-center relative px-2 py-4 bg-[#FDEACA] rounded-lg shrink-0">
        <span className="text-2xl font-semibold">완료된 주문</span>
      </div>
      <ul
        className={`grid ${gridStyle[layout]} gap-4 flex-1 overflow-y-auto p-2 w-full`}
      >
        {orders.map((order) => {
          return (
            <li key={order.id} className="justify-self-center">
              <div className="relative group">
                {/* 메인 주문 카드 */}
                <div className="bg-gradient-to-br from-white to-green-[#AF794B] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#EEDFC1] overflow-hidden">
                  <OrderCard order={order} />

                  {/* 완료 표시 영역 */}
                  <div className="px-4 pb-3 bg-[#FFF8ED] border-t border-[#EEDFC1]">
                    <div className="flex items-center justify-center py-2">
                      <div className="flex items-center gap-2 text-[#AF794B]">
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
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
