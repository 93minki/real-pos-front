import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateMenu } from "@/entities/menu/model/menu-queries";
import { MenuItemType, UpdateMenuRequestType } from "@/shared/types";
import { useEffect, useState } from "react";

interface EditMenuDialogProps {
  menu: MenuItemType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditMenuDialog = ({
  menu,
  open,
  onOpenChange,
}: EditMenuDialogProps) => {
  const [formData, setFormData] = useState<UpdateMenuRequestType>({
    name: "",
    price: 0,
    category: "",
    description: "",
    is_active: true,
  });

  const updateMenuMutation = useUpdateMenu();

  useEffect(() => {
    if (menu) {
      setFormData({
        name: menu.name,
        price: menu.price,
        category: menu.category || "",
        description: menu.description || "",
        is_active: menu.is_active === 1,
      });
    }
  }, [menu]);

  const handleChange = (
    field: keyof UpdateMenuRequestType,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleActiveChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      is_active: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!menu) return;

    try {
      await updateMenuMutation.mutateAsync({
        id: menu.id,
        menuData: formData,
      });
      onOpenChange(false);
    } catch (error) {
      console.error("메뉴 수정 실패: ", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>메뉴 수정</DialogTitle>
          <Switch
            id="is_active"
            checked={formData.is_active}
            onCheckedChange={handleActiveChange}
            className="data-[state=checked]:bg-green-500 mr-4"
          />
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">메뉴명</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="메뉴명을 입력하세요"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">가격</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleChange("price", Number(e.target.value))}
              placeholder="가격을 입력하세요"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">카테고리</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              placeholder="카테고리를 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="메뉴 설명을 입력하세요"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              취소
            </Button>
            <Button type="submit" disabled={updateMenuMutation.isPending}>
              {updateMenuMutation.isPending ? "수정 중..." : "수정"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
