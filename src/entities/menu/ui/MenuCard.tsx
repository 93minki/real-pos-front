"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { MenuItemType } from "@/shared/types";
import { Edit } from "lucide-react";

interface MenuCardProps {
  menu: MenuItemType;
  isEditMode?: boolean;
  onClick?: (menu: MenuItemType) => void;
  onEditClick?: (menu: MenuItemType) => void;
  className?: string;
}

export const MenuCard = ({
  menu,
  isEditMode = false,
  onClick,
  onEditClick,
  className,
}: MenuCardProps) => {
  const isActive = menu.is_active === 1;

  const handleSelectClick = () => {
    if (onClick && !isEditMode) {
      onClick(menu);
    }
  };

  const handleEditClick = () => {
    if (onEditClick) {
      onEditClick(menu);
    }
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md select-none h-[200px] flex flex-col",
        !isActive && !isEditMode && "opacity-50",
        !isActive && isEditMode && "border-red-200 bg-red-50",
        isActive && "border-[#FDEACA] bg-white hover:bg-opacity-50",
        className
      )}
      onClick={handleSelectClick}
    >
      <CardHeader className="pb-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold truncate">
            {menu.name}
          </CardTitle>
          {isEditMode && (
            <Badge variant={isActive ? "primary" : "destructive"}>
              {isActive ? "활성" : "비활성"}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex flex-col flex-grow">
        <div className="flex flex-col gap-2 h-full">
          <p className="text-xl font-bold text-[#6E4E39] flex-shrink-0">
            {menu.price.toLocaleString()}원
          </p>
          <div className="text-sm text-gray-600 flex-grow">
            <p className="font-medium">{menu.category}</p>
            {menu.description && (
              <p className="text-xs line-clamp-1">{menu.description}</p>
            )}
          </div>
          {isEditMode && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleEditClick}
              className="mt-auto self-end justify-self-end"
            >
              <Edit className="h-3 w-3 mr-1" />
              수정
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
