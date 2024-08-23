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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderItem } from "../type/OrderItem";

const deleteOrder = async (id: string) => {
  const response = await fetch(`/api/order/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete order item");
  }
  return response.json();
};

export const DeleteOrder = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteOrder,
    onMutate: async (orderId) => {
      await queryClient.cancelQueries({ queryKey: ["order"] });

      const prevOrderList = queryClient.getQueryData(["order"]) as OrderItem[];
      const updateOrderList = prevOrderList.filter(
        (order) => order._id !== orderId
      );

      queryClient.setQueryData(["order"], updateOrderList);

      return { prevOrderList };
    },
    onError: (error, deleteItmeId, context) => {
      queryClient.setQueryData(["order"], context?.prevOrderList);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });

  const deleteHandler = async () => {
    mutation.mutate(id);
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
            <Button
              onClick={() => deleteHandler()}
              disabled={mutation.isPending}
            >
              삭제하기
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
