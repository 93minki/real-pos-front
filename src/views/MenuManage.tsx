// import { MenuView } from "@/components/pages/order-cart/menu/MenuView";
import { MenuCart, MenuList } from "@/widgets";

const MenuManage = () => {
  return (
    <div className="flex w-full h-full">
      <MenuList />
      <MenuCart />
    </div>
  );
};

export default MenuManage;
