"use client";
import { CartList, PlaceOrderButton } from "@/features";
import { useOrderStore } from "@/shared/lib/order-store";

export const MenuCart = () => {
  const { orderItems } = useOrderStore((state) => state);

  return (
    <div className="flex-grow-[2] basis-[20%] max-w-[20%] min-w-[20%] px-2 flex flex-col gap-8 border-r select-none">
      <div className="flex items-center justify-center relative px-2 py-4 bg-[#FDEACA] rounded-lg">
        <span className="text-2xl">주문 목록</span>
      </div>
      <CartList orderItems={orderItems} />
      <PlaceOrderButton />
    </div>
  );
};
