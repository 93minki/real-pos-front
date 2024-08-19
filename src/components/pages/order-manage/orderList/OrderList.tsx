"use client";
import { Order } from "./Order";

/**
 * 백엔드에서 데이터를 가져올 예정
 * name, quantity, price 객체 배열과 totalPrice 값
 */

const ORDER_ITEMS = [
  {
    orderItems: [
      {
        name: "item1",
        quantity: 1,
        price: 4000,
      },
      {
        name: "item2",
        quantity: 2,
        price: 3000,
      },
    ],
    totalPrice: 10000,
    enable: true,
  },
  {
    orderItems: [
      {
        name: "item1",
        quantity: 5,
        price: 4000,
      },
    ],
    totalPrice: 20000,
    enable: true,
  },
];

export const OrderList = () => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {ORDER_ITEMS.map((orderItem, i) => (
        <>
          {orderItem.enable ? (
            <Order
              key={i}
              orderItems={orderItem.orderItems}
              totalPrice={orderItem.totalPrice}
            />
          ) : (
            ""
          )}
        </>
      ))}
    </div>
  );
};
