import { userAPI } from "@/shared/api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const USER_QUERY_KEYS = {
  user: ["user"] as const,
};

export const useUserInfo = () => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.user,
    queryFn: userAPI.getUserInfo,
  });
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userAPI.updateUserInfo,
    onSuccess: () => {
      alert("회원정보 수정이 완료되었습니다.");
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.user });
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
