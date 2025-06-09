// import { MenuView } from "@/components/pages/order-cart/menu/MenuView";
import { OrderView } from "@/components/pages/order-cart/order/OrderView";
import { MenuList } from "@/widgets";

const MainPage = () => {
  return (
    <div className="flex w-full h-full">
      <MenuList />
      <OrderView />
    </div>
  );
};

export default MainPage;
  