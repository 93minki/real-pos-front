"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCreateMenu } from "@/entities/menu/model/menu-queries";
import { CreateMenuRequestType } from "@/shared/types";
import { Plus } from "lucide-react";
import { useState } from "react";

export const AddMenuDialog = () => {
  const [open, setOpen] = useState(false);
  const [menuIsActive, setMenuIsActive] = useState(true);
  const [formData, setFormData] = useState<CreateMenuRequestType>({
    name: "",
    price: 0,
    category: "",
    description: "",
    is_active: true,
  });

  const createMenuMutation = useCreateMenu();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createMenuMutation.mutateAsync(formData);
      setOpen(false);
      setFormData({
        name: "",
        price: 0,
        category: "",
        description: "",
        is_active: true,
      });
    } catch (error) {
      console.error("메뉴 추가 실패: ", error);
    }
  };

  const handleChange = (
    field: keyof CreateMenuRequestType,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      is_active: menuIsActive,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          메뉴 추가
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>새 메뉴 추가</DialogTitle>
          <Switch
            id="is_active"
            checked={menuIsActive}
            onCheckedChange={setMenuIsActive}
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
              onClick={() => setOpen(false)}
            >
              취소
            </Button>
            <Button type="submit" disabled={createMenuMutation.isPending}>
              {createMenuMutation.isPending ? "추가 중..." : "추가"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
