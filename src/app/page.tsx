import { Logout } from "@/components/pages/auth/logout/Logout";
import { MenuView } from "@/components/pages/order-cart/menu/MenuView";
import { OrderView } from "@/components/pages/order-cart/order/OrderView";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-24 bg-[#F2F2F0] ">
      <div className="absolute top-6 right-6">
        <Link href="/order-manage">
          <Button>주문 관리</Button>
        </Link>
        <Logout />
      </div>
      <div className="flex w-full">
        <MenuView />
        <OrderView />
      </div>
    </main>
  );
}
