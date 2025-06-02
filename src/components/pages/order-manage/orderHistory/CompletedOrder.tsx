"use client";

import { OrderItemDatas } from "../type/OrderItem";

interface CompletedOrderProp {
  orderItems: OrderItemDatas[];
}

export const CompletedOrder = ({ orderItems }: CompletedOrderProp) => {
  return (
    <div className="flex flex-col shadow-lg rounded-lg p-4 bg-white gap-2 w-[230px] h-[200px] overflow-y-auto">
      <div className="flex flex-col gap-2 overflow-y-auto h-[150px]">
        {orderItems &&
          orderItems.map((items) => (
            <div key={items.id} className="flex gap-2">
              <span className="flex-grow-[7] text-lg font-bold">
                {items.menu.name}
              </span>
              <span className="flex-grow-3">{items.quantity} 개</span>
            </div>
          ))}
      </div>
      <span className="text-right text-lg">
        합계:
        <span className="font-bold">
          {orderItems.reduce((acc, cur) => acc + cur.price, 0)}
        </span>
      </span>
    </div>
  );
};
