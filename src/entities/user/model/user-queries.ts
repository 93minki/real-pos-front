import { userAPI } from "@/shared";
import { toast } from "@/shared/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const USER_QUERY_KEYS = {
  user: ["user"] as const,
};

export const useUserInfo = (enabled: boolean = true) => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.user,
    queryFn: userAPI.getUserInfo,
    enabled,
  });
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userAPI.updateUserInfo,
    onSuccess: () => {
      toast({
        title: "회원정보 수정 성공",
        description: "회원정보 수정 성공했습니다.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.user });
    },
    onError: () => {
      toast({
        title: "회원정보 수정 실패",
        description: "회원정보 수정 실패했습니다.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userAPI.deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.user });
      queryClient.clear();
    },
  });
};
