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
    reset,
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

  const orderHandler = async () => {
    const fetchData = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify({
        items: orderItems,
        totalPrice,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await fetchData.json();
    console.log("response", response);
    reset();
  };

  return (
    <div className="flex-grow-[2] basis-[20%] max-w-[20%] min-w-[20%] px-2 flex flex-col h-[850px] gap-8 border-r">
      <div className="flex items-center justify-center relative px-2 py-4 bg-[#FDEACA] rounded-lg">
        <span className="text-2xl">주문 목록</span>
      </div>

      {/* 주문 목록을 담는 부분 */}
      <div className="flex flex-col  overflow-y-auto flex-grow py-4 gap-2">
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

      {/* 합계 금액과 주문 버튼이 위치하는 부분 */}
      <div className="mt-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg">합계:</span>
          <span className="text-2xl font-bold">{totalPrice}</span>
        </div>

        <div>
          {/* 주문 내역을 백엔드로 보내야 함  ECB176*/}
          <button
            className="border px-2 py-4 w-full bg-[#6E4E39] text-2xl rounded-lg text-white"
            onClick={() => {
              orderHandler();
            }}
          >
            주문
          </button>
        </div>
      </div>
    </div>
  );
};
