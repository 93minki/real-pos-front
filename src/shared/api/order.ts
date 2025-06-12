import { fetchWithAuth } from "@/shared/lib/fetchWithAuth";
import { GetOrderListResponseType, OrderItemType } from "../types";
import {
  ConfirmOrderResponseType,
  DeleteOrderResponseType,
  EditOrderResponseType,
} from "../types/order-types";

export const orderAPI = {
  getTodayOrderList: async (): Promise<GetOrderListResponseType["data"]> => {
    const fetchData = await fetchWithAuth("/api/order/today");
    const response: GetOrderListResponseType = await fetchData.json();
    return response.data;
  },
  getMonthlyOrderList: async (
    year: number,
    month: number
  ): Promise<GetOrderListResponseType["data"]> => {
    const response = await fetchWithAuth(
      `/api/order/monthly?year=${year}&month=${month}`
    );
    const responseData: GetOrderListResponseType = await response.json();
    return responseData.data.filter((order) => order.status !== "IN_PROGRESS");
  },
  editOrder: async ({
    orderId,
    editOrderItem,
  }: {
    orderId: string;
    editOrderItem: OrderItemType[];
  }) => {
    const items = editOrderItem.map((item) => ({
      menuId: +item.menu.id,
      quantity: +item.quantity,
      price: +item.menu.price,
    }));
    const response = await fetchWithAuth(`/api/order/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({
        items,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: EditOrderResponseType = await response.json();
    return data.data;
  },
  confirmOrder: async (orderId: string) => {
    const response = await fetchWithAuth(`/api/order/${orderId}/complete`, {
      method: "PATCH",
      body: JSON.stringify({
        active: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: ConfirmOrderResponseType = await response.json();
    return data.data;
  },
  deleteOrder: async (orderId: string) => {
    const response = await fetchWithAuth(`/api/order/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: DeleteOrderResponseType = await response.json();
    return data.data;
  },
};
