"use client";

import { calcTotalPrice } from "@/lib/utils";
import { OrderItemDatas } from "../type/OrderItem";

interface CompletedOrderProp {
  orderItems: OrderItemDatas[];
}

export const CompletedOrder = ({ orderItems }: CompletedOrderProp) => {
  return (
    <div
      role="button"
      className="flex flex-col shadow-lg rounded-lg p-4 bg-white gap-2"
    >
      {orderItems &&
        orderItems.map((items) => (
          <div key={items.id} className="flex gap-2">
            <span className="flex-grow-[7] text-lg font-bold">
              {items.menu.name}
            </span>
            <span className="flex-grow-3">{items.quantity} 개</span>
          </div>
        ))}
      <span className="text-right text-lg">
        합계:
        <span className="font-bold">{calcTotalPrice(orderItems)}</span>
      </span>
    </div>
  );
};
