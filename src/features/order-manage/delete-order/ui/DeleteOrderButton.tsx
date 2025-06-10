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
import { useDeleteOrder } from "@/entities";

interface DeleteOrderButtonProps {
  orderId: string;
}

export const DeleteOrderButton = ({ orderId }: DeleteOrderButtonProps) => {
  const mutation = useDeleteOrder();

  const deleteHandler = async () => {
    mutation.mutate(orderId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">삭제</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>주문을 완전히 삭제합니다</AlertDialogTitle>
          <AlertDialogDescription>
            데이터베이스에서 제거되며, 복구할 수 없습니다. 삭제된 주문은 매출
            집계에 포함되지 않습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={deleteHandler} disabled={mutation.isPending}>
              삭제하기
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
