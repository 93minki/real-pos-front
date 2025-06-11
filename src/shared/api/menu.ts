import { fetchWithAuth } from "@/shared/lib/fetchWithAuth";
import {
  CreateMenuRequestType,
  CreateMenuResponseType,
  MenuItemType,
  MenuListResponseType,
  UpdateMenuRequestType,
  UpdateMenuResponseType,
} from "../types";

export const menuAPI = {
  getMenuList: async (): Promise<MenuItemType[]> => {
    const response = await fetchWithAuth("/api/menu");
    const data: MenuListResponseType = await response.json();
    return data.data;
  },
  createMenu: async (
    menuData: CreateMenuRequestType
  ): Promise<CreateMenuResponseType["data"]> => {
    const response = await fetchWithAuth("/api/menu", {
      method: "POST",
      body: JSON.stringify(menuData),
    });
    const data: CreateMenuResponseType = await response.json();
    return data.data;
  },
  updateMenu: async ({
    id,
    menuData,
  }: {
    id: number;
    menuData: UpdateMenuRequestType;
  }): Promise<UpdateMenuResponseType["data"]> => {
    const response = await fetchWithAuth(`/api/menu/${id}`, {
      method: "PATCH",
      body: JSON.stringify(menuData),
    });
    const data: UpdateMenuResponseType = await response.json();
    return data.data;
  },
};
