import { trimOrderTime } from "@/lib/utils";
import { OrderType } from "@/shared/types";

interface OrderCardProps {
  order: OrderType;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div key={order.id} className="flex flex-col gap-3 p-4 w-[230px] h-[250px]">
      {/* 주문 시간 */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
          주문 시간
        </span>
        <span className="text-sm font-semibold text-gray-800">
          {trimOrderTime(order.updated_at)}
        </span>
      </div>

      {/* 주문 금액 */}
      <div className="bg-gradient-to-r from-[#AF794B] to-[#6E4E39] text-white p-3 rounded-lg">
        <div className="text-xl font-bold">
          {order.items
            .reduce((acc, cur) => acc + cur.price, 0)
            .toLocaleString()}
          원
        </div>
      </div>

      {/* 주문 내역 */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <ul className="space-y-1">
            {order.items.map((item) => (
              <li
                key={item.menu.id}
                className="flex items-center justify-between bg-gray-50 px-2 py-1 rounded text-sm"
              >
                <span className="font-medium text-gray-800 truncate">
                  {item.menu.name}
                </span>
                <span className="text-xs text-gray-600 bg-white px-1 py-0.5 rounded font-semibold ml-2 shrink-0">
                  ×{item.quantity}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
