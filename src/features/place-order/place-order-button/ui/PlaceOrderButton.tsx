"use client";
import { fetchWithAuth, useOrderStore } from "@/shared";

interface PlaceOrderButtonProps {
  isEnabled: boolean;
}

export const PlaceOrderButton = ({ isEnabled }: PlaceOrderButtonProps) => {
  const { orderItems, totalPrice, reset } = useOrderStore((state) => state);

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
    <div className="mt-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg">합계:</span>
        <span className="text-2xl font-bold">{totalPrice}</span>
      </div>

      <div>
        <button
          className={`border px-2 py-4 w-full bg-[#6E4E39] text-2xl rounded-lg text-white ${
            !isEnabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={orderHandler}
          disabled={!isEnabled}
        >
          주문
        </button>
      </div>
    </div>
  );
};
