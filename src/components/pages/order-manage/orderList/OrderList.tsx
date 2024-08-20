"use client";
import { useEffect, useState } from "react";
import { Order } from "./Order";

/**
 * 백엔드에서 데이터를 가져올 예정
 * name, quantity, price 객체 배열과 totalPrice 값
 */

type OrderItemsType = {
  name: string;
  price: number;
  quantity: number;
};

type OrderDataType = {
  _id: string;
  items: OrderItemsType[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

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
  const [orderList, setOrderList] = useState<OrderDataType[] | null>();

  useEffect(() => {
    const getOrderDatas = async () => {
      const fetchData = await fetch("/api/order");
      const response: { data: OrderDataType } = await fetchData.json();
      console.log("repsonse.data", response.data);
    };
    getOrderDatas();
  }, []);

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
