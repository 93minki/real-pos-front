"use client";
import { fetchWithAuth, useOrderStore } from "@/shared";
import { toast } from "@/shared/hooks/use-toast";

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

    const response = await fetchWithAuth("/api/order", {
      method: "POST",
      body: JSON.stringify({
        items,
        status: "IN_PROGRESS",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.ok);
    if (!response.ok) {
      toast({
        title: "주문 실패",
        description: "주문 실패.",
        variant: "destructive",
        duration: 1000,
      });
      return;
    } else {
      toast({
        title: "주문 성공",
        description: "주문 성공.",
        variant: "default",
        duration: 1000,
      });
    }

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
