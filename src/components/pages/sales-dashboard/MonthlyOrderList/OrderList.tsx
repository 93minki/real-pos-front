import { useEffect, useState } from "react";
import { OrderItem } from "../../order-manage/type/OrderItem";

interface OrderListProps {
  year: number;
  month: number;
  date: number;
  monthOrderData: OrderItem[];
}

const trimOrderTime = (isoStringDate: Date) => {
  // Date 객체로 변환
  const date = new Date(isoStringDate);

  // 시간, 분, 초 추출
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

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
  const [orderListByDay, setOrderListByDay] = useState<OrderItem[]>([]);
  const [totalPriceByDay, setTotalPriceByDay] = useState(0);

  useEffect(() => {
    const dayOrderData = monthOrderData.filter((orderData) => {
      const orderDate = new Date(orderData.updatedAt).getDate();
      return orderDate === date;
    });

    const totalPrice = dayOrderData.reduce(
      (acc, cur) => acc + cur.totalPrice,
      0
    );

    setOrderListByDay(dayOrderData);
    setTotalPriceByDay(totalPrice);
  }, [monthOrderData, date]);

  return (
    <div className="">
      <div>
        <span>
          {year}-{month}-{date} 총 매출:
        </span>
        <span className="text-2xl">{totalPriceByDay}</span>
      </div>
      <div className="flex flex-wrap w-[700px]">
        {orderListByDay.map((order) => {
          return (
            <div
              key={order._id}
              className="flex flex-col gap-2 border w-[230px]"
            >
              <span>주문 시간: {trimOrderTime(order.updatedAt)}</span>
              <span>주문 금액: {order.totalPrice}</span>
              <div>
                주문 내역
                {order.items.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <span>{item.name}</span>
                    {/* <span>{item.price}</span> */}
                    <span>{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
