import { orderAPI, type OrderItemType, type OrderType } from "@/shared";
import { toast } from "@/shared/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ORDER_QUERY_KEYS = {
  orderList: ["order-list"] as const,
  monthlyOrderList: (year: number, month: number) =>
    ["monthly-order-list", year, month] as const,
};

export const useTodayOrderList = () => {
  return useQuery({
    queryKey: ORDER_QUERY_KEYS.orderList,
    queryFn: orderAPI.getTodayOrderList,
  });
};

export const useMonthlyOrderList = (year: number, month: number) => {
  return useQuery({
    queryKey: ORDER_QUERY_KEYS.monthlyOrderList(year, month),
    queryFn: () => orderAPI.getMonthlyOrderList(year, month),
  });
};

export const useEditOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      editOrderItem,
    }: {
      orderId: string;
      editOrderItem: OrderItemType[];
    }) => orderAPI.editOrder({ orderId, editOrderItem }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.orderList });
      toast({
        title: "주문 수정 성공",
        description: "주문 수정 성공했습니다.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "주문 수정 실패",
        description: "주문 수정 실패했습니다.",
        variant: "destructive",
      });
    },
  });
};

export const useConfirmOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => orderAPI.confirmOrder(orderId),
    onMutate: async (orderId) => {
      // 기존 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ORDER_QUERY_KEYS.orderList });

      // 현재 데이터 스냅샷 저장
      const previousData = queryClient.getQueryData<OrderType[]>(
        ORDER_QUERY_KEYS.orderList
      );

      // Optimistic update 적용
      queryClient.setQueryData<OrderType[]>(
        ORDER_QUERY_KEYS.orderList,
        (old) => {
          if (!old) return old;
          return old.map((order) =>
            order.id.toString() === orderId
              ? { ...order, status: "COMPLETED" as const }
              : order
          );
        }
      );

      return { previousData };
    },
    onError: (err, orderId, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      queryClient.setQueryData(
        ORDER_QUERY_KEYS.orderList,
        context?.previousData
      );
      toast({
        title: "주문 완료 실패",
        description: "주문 완료 실패했습니다.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "주문 완료 성공",
        description: "주문 완료 성공했습니다.",
        variant: "default",
      });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => orderAPI.deleteOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.orderList });
      toast({
        title: "주문 삭제 성공",
        description: "주문 삭제 성공했습니다.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "주문 삭제 실패",
        description: "주문 삭제 실패했습니다.",
        variant: "destructive",
      });
    },
  });
};
