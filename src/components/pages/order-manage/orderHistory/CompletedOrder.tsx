"use client";

import { calcTotalPrice } from "@/lib/utils";
import { OrderItemDatas } from "../type/OrderItem";
import { DeleteOrder } from "./DeleteOrder";

interface CompletedOrderProp {
  orderItems: OrderItemDatas[];
  orderId: string;
}

export const CompletedOrder = ({ orderId, orderItems }: CompletedOrderProp) => {
  return (
    <div role="button" className="flex flex-col shadow-lg rounded-lg p-4">
      {orderItems &&
        orderItems.map((items) => (
          <div key={items._id} className="flex gap-2">
            <span>{items.name}</span>
            <span>{items.quantity}</span>
          </div>
        ))}
      <span>합계:{calcTotalPrice(orderItems)}</span>

      <DeleteOrder id={orderId} />
    </div>
  );
};
