import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMenuStore } from "@/provider/menu-store-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteItems = async (id: string) => {
  const response = await fetch(`/api/menu/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete menu item");
  }
  return response.json();
};

export const DeleteMenu = ({ id }: { id: string }) => {
  const { setMenuItems, menuItems } = useMenuStore((state) => state);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    },
  });

  const deleteHandler = async () => {
    mutation.mutate(id);
    if (mutation.isSuccess) {
      const updateMenuItems = menuItems.filter(
        (item) => item._id !== mutation.data._id
      );
      setMenuItems(updateMenuItems);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">삭제</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>메뉴를 완전히 삭제합니다</AlertDialogTitle>
          <AlertDialogDescription>
            데이터베이스에서 제거되며, 복구할 수 없습니다. 일시적으로 사용하지
            않으려면 수정에서 비활성화 처리하시기 바랍니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={() => deleteHandler()}>삭제하기</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
