"use client";

import { useState } from "react";

export const OrderView = () => {
  const [quantity, setQuantity] = useState(1);

  const upCount = () => {
    setQuantity((prev) => prev + 1);
  };
  const downCount = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex-grow-[2] px-2">
      <div className="flex gap-2 border justify-center items-center">
        <span>item</span>
        <div className="flex gap-4">
          <button className="border px-2" onClick={downCount}>
            -
          </button>
          <span>{quantity}</span>
          <button className="border px-2" onClick={upCount}>
            +
          </button>
        </div>
      </div>

      <div>
        <span>totalPrice</span>
      </div>
    </div>
  );
};
