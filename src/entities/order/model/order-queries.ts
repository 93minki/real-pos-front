import { orderAPI } from "@/shared/api/order";
import { OrderItemType, OrderType } from "@/shared/types";
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
    },
    onSettled: () => {
      // 성공/실패와 관계없이 최종적으로 서버와 동기화
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.orderList });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => orderAPI.deleteOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.orderList });
    },
  });
};
