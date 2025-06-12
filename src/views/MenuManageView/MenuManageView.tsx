import { MenuCart, MenuList } from "@/widgets";

export const MenuManageView = () => {
  return (
    <div className="flex w-full h-full">
      <MenuList />
      <MenuCart />
    </div>
  );
};
