"use client";
import { MenuCartList } from "@/features";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useOrderStore } from "@/lib/order-store";

export const MenuCart = () => {
  const {
    orderItems,
    totalPrice,
    increaseOrderCount,
    decreaseOrderCount,
    reset,
  } = useOrderStore((state) => state);

  const orderHandler = async () => {
    const items = orderItems.map((item) => {
      return {
        menuId: +item.id,
        quantity: item.quantity,
      };
    });
    await fetchWithAuth("/api/order", {
      method: "POST",
      body: JSON.stringify({
        items,
        status: "IN_PROGRESS",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    reset();
  };

  return (
    <div className="flex-grow-[2] basis-[20%] max-w-[20%] min-w-[20%] px-2 flex flex-col gap-8 border-r select-none">
      <div className="flex items-center justify-center relative px-2 py-4 bg-[#FDEACA] rounded-lg">
        <span className="text-2xl">주문 목록</span>
      </div>

      {/* 주문 목록을 담는 부분 */}
      <MenuCartList
        orderItems={orderItems}
        increaseOrderCount={increaseOrderCount}
        decreaseOrderCount={decreaseOrderCount}
      />

      {/* 합계 금액과 주문 버튼이 위치하는 부분 */}
      <div className="mt-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg">합계:</span>
          <span className="text-2xl font-bold">{totalPrice}</span>
        </div>

        <div>
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
