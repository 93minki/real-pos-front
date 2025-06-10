"use client";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useOrderStore } from "@/lib/order-store";

interface PlaceOrderButtonProps {
  className?: string;
}

export const PlaceOrderButton = ({ className }: PlaceOrderButtonProps) => {
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
          className={`border px-2 py-4 w-full bg-[#6E4E39] text-2xl rounded-lg text-white ${className}`}
          onClick={orderHandler}
        >
          주문
        </button>
      </div>
    </div>
  );
};
