"use client";
import { OrderItems } from "@/store/order-store";
import { useEffect, useState } from "react";
import { Order } from "./Order";

type OrderDataType = {
  _id: string;
  items: OrderItems[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const OrderList = () => {
  const [orderList, setOrderList] = useState<OrderDataType[] | null>();

  useEffect(() => {
    const getOrderDatas = async () => {
      const fetchData = await fetch("/api/order");
      const response: { data: OrderDataType[] } = await fetchData.json();
      setOrderList(response.data);
    };
    getOrderDatas();
  }, []);

  return (
    <ul className="grid grid-cols-5 gap-4">
      {orderList &&
        orderList.map((order) => {
          return (
            order.active && (
              <li key={order._id} className="">
                <Order orderItems={order.items} />
              </li>
            )
          );
        })}
    </ul>
  );
};
