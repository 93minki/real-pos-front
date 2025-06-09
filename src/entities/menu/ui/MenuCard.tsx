"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
        "cursor-pointer transition-all duration-200 hover:shadow-md select-none",
        !isActive && !isEditMode && "opacity-50",
        !isActive && isEditMode && "border-red-200 bg-red-50",
        isActive && "border-[#FDEACA] bg-white hover:bg-opacity-50",
        className
      )}
      onClick={handleSelectClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold truncate">
            {menu.name} {menu.id}
          </CardTitle>
          {isEditMode && (
            <Badge variant={isActive ? "default" : "destructive"}>
              {isActive ? "활성" : "비활성"}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <p className="text-xl font-bold text-blue-600">
            {menu.price.toLocaleString()}원
          </p>
          <div className="text-sm text-gray-600">
            <p className="font-medium">{menu.category}</p>
            {menu.description && (
              <p className="text-xs mt-1 line-clamp-2">{menu.description}</p>
            )}
          </div>
        </div>
        {isEditMode && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleEditClick}
            className="flex-1"
          >
            <Edit className="h-3 w-3 mr-1" />
            수정
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
