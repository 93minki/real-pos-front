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

  // 일일 매출 계산
  const dailySales = orders.reduce(
    (acc, order) =>
      acc + order.items.reduce((acc, item) => acc + item.price, 0),
    0
  );

  return (
    <div className="flex flex-col flex-grow-[5] basis-[50%] h-[calc(100vh-120px)] gap-4">
      <div className="flex items-center justify-center relative px-2 py-4 bg-[#FDEACA] rounded-lg shrink-0">
        <span className="text-2xl font-semibold">완료된 주문</span>
      </div>

      {/* 일일 매출 카드 */}
      <div className="bg-gradient-to-r from-[#AF794B] to-[#6E4E39] rounded-xl p-4 shadow-lg shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div>
              <p className="text-white/80 text-sm font-medium">일일 매출</p>
              <p className="text-white text-xl font-bold">
                {dailySales > 0
                  ? `${dailySales.toLocaleString()}원`
                  : "매출 없음"}
              </p>
            </div>
          </div>

          {dailySales > 0 && (
            <div className="text-right">
              <p className="text-white/80 text-xs">완료된 주문</p>
              <p className="text-white text-lg font-semibold">
                {orders.length}건
              </p>
            </div>
          )}
        </div>

        {dailySales === 0 && (
          <div className="mt-2 text-center">
            <p className="text-white/60 text-sm">아직 완료된 주문이 없습니다</p>
          </div>
        )}
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
