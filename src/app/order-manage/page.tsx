import { OrderHistory } from "@/components/pages/order-manage/orderHistory/OrderHistory";
import { OrderList } from "@/components/pages/order-manage/orderList/OrderList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderManagePage() {
  return (
    <main className="flex min-h-screen items-center justify-between p-24 bg-[#F2F2F0]">
         <div className="absolute top-6 right-6">
        <Link href="/">
          <Button>메뉴화면</Button>
        </Link>
        
      </div>
      <div className="flex w-full gap-16">
        <OrderList />
        <OrderHistory />
      </div>
    </main>
  );
}
