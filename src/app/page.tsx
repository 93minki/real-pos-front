import { MenuView } from "@/components/pages/order-cart/menu/MenuView";
import { OrderView } from "@/components/pages/order-cart/order/OrderView";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-24 bg-[#F2F2F0] ">
      <div className="flex w-full">
        <MenuView />
        <OrderView />
      </div>
    </main>
  );
}
