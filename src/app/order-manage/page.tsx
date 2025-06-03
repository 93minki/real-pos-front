import { OrderHistory } from "@/components/pages/order-manage/orderHistory/OrderHistory";
import { OrderList } from "@/components/pages/order-manage/orderList/OrderList";

export default function OrderManagePage() {
  return (
    <main className="flex h-screen w-full items-start p-24 bg-[#F2F2F0] gap-4">
      <OrderList />
      <OrderHistory />
    </main>
  );
}
