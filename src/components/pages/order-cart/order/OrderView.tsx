"use client";

import { useOrderStore } from "@/provider/order-store-provider";
import { OrderItems } from "./OrderItems";

export const OrderView = () => {
  const {
    orderItems,
    totalPrice,
    increaseOrderCount,
    decreaseOrderCount,
    deleteOrder,
  } = useOrderStore((state) => state);

  const upCount = (name: string) => {
    increaseOrderCount(name);
  };
  const downCount = (name: string) => {
    decreaseOrderCount(name);
  };

  const deleteItem = (name: string) => {
    deleteOrder(name);
  };

  return (
    <div className="flex-grow-[2] basis-[20%] max-w-[20%] min-w-[20%] px-2">
      <div className="flex flex-col">
        {orderItems.map((item) => {
          return (
            <OrderItems
              key={item.name}
              name={item.name}
              quantity={item.quantity}
              downCount={downCount}
              upCount={upCount}
              deleteItem={deleteItem}
            />
          );
        })}
      </div>

      <div className="flex justify-center items-center p-2 gap-4 ">
        <span>합계:</span>
        <span>{totalPrice}</span>
      </div>

      <div>
        {/* 주문 내역을 백엔드로 보내야 함 */}
        <button className="border p-2 w-full">주문</button>
      </div>
    </div>
  );
};
