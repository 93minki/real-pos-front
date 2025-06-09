"use client";

import { useMenuList } from "@/entities/menu/model/menu-queries";
import { MenuCard } from "@/entities/menu/ui";
import { AddMenuDialog, EditMenuDialog, ToggleEditMode } from "@/features";
import { useOrderStore } from "@/lib/order-store";
import { MenuItemType } from "@/shared/types";
import { useState } from "react";

export const MenuList = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editMenuItem, setEditMenuItem] = useState<MenuItemType | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { data: menuList, isPending, error } = useMenuList();
  const reset = useOrderStore((state) => state.reset);
  const addOrder = useOrderStore((state) => state.addOrder);

  const handleEditModeToggle = (editMode: boolean) => {
    setIsEditMode(editMode);
    reset();
  };

  const handleMenuCardClick = async (menu: MenuItemType) => {
    addOrder({ id: menu.id, name: menu.name, price: menu.price, quantity: 1 });
  };

  const handleEditMenuClick = (menu: MenuItemType) => {
    setEditMenuItem(menu);
    setIsEditDialogOpen(true);
  };

  if (isPending) {
    return (
      <div className="flex-grow-[8] basis-[80%] max-w-[80%] min-w-[80%] pr-2 flex items-center justify-center border-r">
        <div className="text-lg">메뉴 로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow-[8] basis-[80%] max-w-[80%] min-w-[80%] pr-2 flex items-center justify-center border-r">
        <div className="text-lg text-red-500">
          메뉴 가져오는데 실패했습니다...
        </div>
      </div>
    );
  }

  const filteredMenuList =
    menuList?.filter((menu) => isEditMode || menu.is_active === 1) || [];

  return (
    <div className="flex-grow-[8] basis-[80%] max-w-[80%] min-w-[80%] pr-2 flex flex-col gap-8 border-r">
      {/* 헤더 */}
      <div className="flex items-center justify-center relative px-2 py-4 bg-[#FDEACA] rounded-lg">
        <span className="text-2xl font-semibold">메뉴 리스트</span>

        <div className="absolute right-5 flex items-center justify-center gap-2">
          {isEditMode && <AddMenuDialog />}
          <ToggleEditMode
            isEditMode={isEditMode}
            onToggle={handleEditModeToggle}
          />
        </div>
      </div>

      {/* 메뉴 그리드 */}
      <div className="grid grid-cols-5 gap-4">
        {filteredMenuList.map((menu) => (
          <MenuCard
            key={menu.id}
            menu={menu}
            isEditMode={isEditMode}
            onClick={handleMenuCardClick}
            onEditClick={handleEditMenuClick}
          />
        ))}
      </div>

      {filteredMenuList.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500 text-lg">
            {isEditMode
              ? "등록된 메뉴가 없습니다."
              : "활성화된 메뉴가 없습니다."}
          </p>
        </div>
      )}

      <EditMenuDialog
        menu={editMenuItem}
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) {
            setEditMenuItem(null);
          }
        }}
      />
    </div>
  );
};
