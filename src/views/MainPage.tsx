// import { MenuView } from "@/components/pages/order-cart/menu/MenuView";
import { MenuList } from "@/widgets";
import { MenuCart } from "@/widgets/menuCart/ui/MenuCart";

const MainPage = () => {
  return (
    <div className="flex w-full h-full">
      <MenuList />
      <MenuCart />
    </div>
  );
};

export default MainPage;
