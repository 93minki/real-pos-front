import { useEffect, useState } from "react";
import { OrderListItems } from "../../order-manage/type/OrderItem";

interface OrderListProps {
  year: string;
  month: string;
  date: string;
  monthOrderData: OrderListItems[];
}

const trimOrderTime = (isoStringDate: Date) => {
  // Date 객체로 변환
  const date = new Date(isoStringDate);

  // 시간, 분, 초 추출
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // 분과 초가 한 자리일 경우 앞에 0 추가
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

  // 결과 문자열 반환
  return `${hours}:${formattedMinutes}:${formattedSeconds}`;
};

export const OrderList = ({
  year,
  month,
  date,
  monthOrderData,
}: OrderListProps) => {
  const [orderListByDay, setOrderListByDay] = useState<OrderListItems[]>([]);
  const [totalPriceByDay, setTotalPriceByDay] = useState(0);

  useEffect(() => {
    const dayOrderData = monthOrderData.filter((orderData) => {
      const orderDate = new Date(orderData.updated_at).getDate();
      return orderDate === parseInt(date);
    });

    const totalPrice = dayOrderData.reduce(
      (acc, cur) => acc + cur.items.reduce((acc, cur) => acc + cur.price, 0),
      0
    );

    setOrderListByDay(dayOrderData);
    setTotalPriceByDay(totalPrice);
  }, [monthOrderData, date]);

  return (
    <div className="flex flex-col gap-4 ml-8 h-full overflow-y-auto">
      <div className="mb-2">
        <span className="font-semibold text-lg mr-2">
          {year}-{month}-{date} 총 매출:
        </span>
        <span className="text-2xl text-[#AF794B] font-bold">
          {totalPriceByDay.toLocaleString()}
        </span>
      </div>
      <div className="flex flex-wrap gap-4">
        {orderListByDay.length === 0 ? (
          <div className="w-full h-full text-center text-gray-400 py-12 bg-white rounded-lg shadow">
            주문 내역이 없습니다.
          </div>
        ) : (
          orderListByDay.map((order) => {
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
                  {order.items
                    .reduce((acc, cur) => acc + cur.price, 0)
                    .toLocaleString()}
                  원
                </span>
                <div className="mt-2 overflow-y-auto">
                  <ul className="mt-1 ml-2 flex flex-col gap-1">
                    {order.items.map((item) => (
                      <li
                        key={item.menu.id}
                        className="flex gap-2 text-gray-800"
                      >
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
          })
        )}
      </div>
    </div>
  );
};
