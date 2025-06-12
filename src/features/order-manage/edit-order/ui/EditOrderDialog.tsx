"use client";
import { useEditOrder, useMenuList } from "@/entities";
import { MenuItemType, OrderItemType } from "@/shared";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { FormEvent, useState } from "react";

interface EditOrderDialogProps {
  orderItems: OrderItemType[];
  orderId: string;
}

export const EditOrderDialog = ({
  orderId,
  orderItems,
}: EditOrderDialogProps) => {
  const [orderItemList, setOrderItemList] =
    useState<OrderItemType[]>(orderItems);
  const [showMenuList, setShowMenuList] = useState(false);

  const { data: menuList } = useMenuList();

  const mutation = useEditOrder();

  const handleAddMenu = (menu: MenuItemType) => {
    setOrderItemList((prev) => {
      const exist = prev.find((item) => item.menu.id === menu.id.toString());
      if (exist) {
        // 이미 있으면 수량 +1
        return prev.map((item) =>
          item.menu.id === menu.id.toString()
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // 없으면 OrderItemDatas 타입에 맞게 추가
      return [
        ...prev,
        {
          id: Date.now(), // 임시 id
          menu: {
            ...menu,
            id: menu.id.toString(),
            quantity: 1,
            created_at: new Date(),
            updated_at: new Date(),
          },
          quantity: 1,
          price: menu.price,
        },
      ];
    });
  };

  const handleChangeItemQuantity = (id: number, quantity: number) => {
    setOrderItemList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };
  const handleRemoveItem = (id: number) => {
    setOrderItemList((prev) => prev.filter((item) => item.id !== id));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync({ orderId, editOrderItem: orderItemList });
    } catch (error) {
      console.error("주문 수정 실패: ", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full bg-white hover:bg-blue-50 border-blue-200 text-blue-700 hover:text-blue-800 transition-colors rounded-lg"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          수정
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>주문 수정</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <fieldset>
            <legend className="font-bold mb-2">주문 목록</legend>
            <div className="flex flex-col gap-3 mb-4">
              {orderItemList.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-gray-50 rounded-lg px-4 py-2 shadow-sm"
                >
                  <span className="w-32 font-semibold">{item.menu.name}</span>
                  <span className="w-20 text-right">{item.menu.price}원</span>
                  <input
                    className="border py-1 px-2 rounded-lg w-20 text-center"
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleChangeItemQuantity(item.id, Number(e.target.value))
                    }
                  />
                  <button
                    type="button"
                    className="ml-auto text-gray-400 hover:text-red-500"
                    onClick={() => handleRemoveItem(item.id)}
                    aria-label="삭제"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-brown-700">
                총 가격:{" "}
                {orderItemList
                  .reduce((acc, cur) => acc + cur.menu.price * cur.quantity, 0)
                  .toLocaleString()}
                원
              </span>
              <Button
                type="button"
                variant="default"
                className="ml-4"
                onClick={() => setShowMenuList((prev) => !prev)}
              >
                메뉴추가
              </Button>
            </div>
          </fieldset>

          {showMenuList && menuList && menuList.length > 0 && (
            <div className="border rounded-lg p-4 mb-6 bg-gray-50">
              <div className="flex flex-wrap gap-4">
                {menuList
                  .filter((menu) => menu.is_active === 1)
                  .map((menu) => (
                    <div
                      key={menu.id}
                      className="flex flex-col items-center w-32 p-2 bg-white rounded shadow"
                    >
                      <div className="font-semibold mb-1">{menu.name}</div>
                      <div className="text-sm text-gray-500 mb-2">
                        {menu.price}원
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => handleAddMenu(menu)}
                      >
                        추가
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                취소
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" variant="default">
                변경하기
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
