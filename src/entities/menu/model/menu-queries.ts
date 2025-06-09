import { menuAPI } from "@/shared/api/menu";
import { CreateMenuRequestType, UpdateMenuRequestType } from "@/shared/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const MENU_QUERY_KEYS = {
  menuList: ["menu-list"] as const,
};

export const useMenuList = () => {
  return useQuery({
    queryKey: MENU_QUERY_KEYS.menuList,
    queryFn: menuAPI.getMenuList,
  });
};

export const useCreateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (menuData: CreateMenuRequestType) =>
      menuAPI.createMenu(menuData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENU_QUERY_KEYS.menuList });
    },
  });
};

export const useUpdateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      menuData,
    }: {
      id: number;
      menuData: UpdateMenuRequestType;
    }) => menuAPI.updateMenu({ id, menuData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENU_QUERY_KEYS.menuList });
    },
  });
};
