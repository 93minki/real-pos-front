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
        <Button
          variant="outline"
          className="w-full bg-white hover:bg-red-50 border-red-200 text-red-700 hover:text-red-800 transition-colors rounded-lg"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          삭제
        </Button>
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
