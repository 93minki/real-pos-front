import { OrderHistory } from "@/components/pages/order-manage/orderHistory/OrderHistory";
import { OrderList } from "@/components/pages/order-manage/orderList/OrderList";

export default function OrderManagePage() {
  return (
    <main className="flex min-h-screen items-center justify-between p-24 bg-[#F2F2F0]">
      <div className="flex w-full gap-16">
        <OrderList />
        <OrderHistory />
      </div>
    </main>
  );
}
