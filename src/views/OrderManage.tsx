"use client";
import { useTodayOrderList } from "@/entities";
import { useOrderSSE } from "@/lib/useOrderSSE";
import { ConfirmedOrderList, InprogressOrderList } from "@/widgets";

const OrderManage = () => {
  useOrderSSE();
  const { data: orderList, isPending, isFetching } = useTodayOrderList();

  if (isPending || isFetching) {
    return (
      <div className="flex w-full h-full gap-4 items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  const inprogressOrders =
    orderList?.filter((order) => order.status === "IN_PROGRESS") || [];

  const completedOrders =
    orderList?.filter((order) => order.status === "COMPLETED") || [];

  return (
    <div className="flex w-full h-full gap-4">
      <InprogressOrderList orders={inprogressOrders} />
      <ConfirmedOrderList orders={completedOrders} />
    </div>
  );
};

export default OrderManage;
