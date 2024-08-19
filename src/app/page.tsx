import { MenuView } from "@/components/pages/menu/MenuView";
import { OrderView } from "@/components/pages/order/OrderView";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      <MenuView />
      <OrderView />
    </main>
  );
}
