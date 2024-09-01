import { OrderItem } from "../../order-manage/type/OrderItem";

interface OrderListProps {
  year: number;
  month: number;
  date: number;
  monthOrderData: OrderItem[];
}

export const OrderList = ({
  year,
  month,
  date,
  monthOrderData,
}: OrderListProps) => {
  const RenderOrderByDay = (monthOrderData: OrderItem[]) => {
    console.log("param", monthOrderData);
    const filteredOrder = monthOrderData.filter((orderData) => {
      const orderDate = new Date(orderData.updatedAt).getDate();
      console.log("orderDate", orderDate);
      return orderDate === date;
    });

    return (
      <div className="">
        {filteredOrder.map((order) => {
          return (
            <div key={order._id} className="flex flex-col gap-2 border">
              {order.items.map((item) => (
                <div key={item._id} className="flex gap-4">
                  <span>{item.name}</span>
                  {/* <span>{item.price}</span> */}
                  <span>{item.quantity}</span>
                </div>
              ))}
              <span>total: {order.totalPrice}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    // 주문 내역
    <div>{RenderOrderByDay(monthOrderData)}</div>
  );
};
