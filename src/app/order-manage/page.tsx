import { OrderList } from "@/components/pages/order-manage/orderList/OrderList";

export default function OrderManagePage() {
  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      <OrderList />
    </main>
  );
}
