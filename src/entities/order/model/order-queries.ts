import { orderAPI } from "@/shared/api/order";
import { OrderItemType } from "@/shared/types";
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
    onSuccess: () => {
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
