import { trimOrderTime } from "@/lib/utils";
import { OrderType } from "@/shared/types";

interface OrderCardProps {
  order: OrderType;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div
      key={order.id}
      className="flex flex-col gap-2 bg-white rounded-xl shadow-md p-4 w-[230px] h-[250px]  border hover:shadow-lg transition"
    >
      <span className="text-sm text-gray-500">
        주문 시간:{" "}
        <span className="font-semibold text-gray-800">
          {trimOrderTime(order.updated_at)}
        </span>
      </span>
      <span className="text-base font-bold text-[#AF794B]">
        주문 금액:{" "}
        {order.items.reduce((acc, cur) => acc + cur.price, 0).toLocaleString()}
        원
      </span>
      <div className="mt-2 overflow-y-auto">
        <ul className="mt-1 ml-2 flex flex-col gap-1">
          {order.items.map((item) => (
            <li key={item.menu.id} className="flex gap-2 text-gray-800">
              <span className="font-medium">{item.menu.name}</span>
              <span className="text-xs text-gray-500 self-center">
                x{item.quantity}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
