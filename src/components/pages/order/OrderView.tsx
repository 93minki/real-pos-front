"use client";

import { useOrderStore } from "@/provider/order-store-provider";
import { useState } from "react";
import { OrderItems } from "./OrderItems";

export const OrderView = () => {
  const [quantity, setQuantity] = useState(1);
  const { orderItems, totalPrice, increaseOrderCount, decreaseOrderCount } = useOrderStore(
    (state) => state
  );

  const upCount = (name: string) => {
    increaseOrderCount(name);
  };
  const downCount = (name: string) => {
    decreaseOrderCount(name)
  };

  return (
    <div className="flex-grow-[2] px-2">
      {orderItems.map((item) => {
        return (
          <OrderItems
            key={item.name}
            name={item.name}
            quantity={item.quantity}
            downCount={downCount}
            upCount={upCount}
          />
        );
      })}

      <div>
        <span>{totalPrice}</span>
      </div>
    </div>
  );
};
