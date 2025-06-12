import { fetchWithAuth } from "@/shared/lib/fetchWithAuth";
import {
  DeleteAccountResponseType,
  UpdateUserInfoResponseType,
  UpdateUserInfoType,
  UserInfoResponseType,
} from "../types/user-types";

export const userAPI = {
  getUserInfo: async () => {
    const fetchData = await fetchWithAuth("/api/user");
    const response: UserInfoResponseType = await fetchData.json();
    return response.data;
  },
  updateUserInfo: async (updateData: UpdateUserInfoType) => {
    const fetchData = await fetchWithAuth("/api/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    const response: UpdateUserInfoResponseType = await fetchData.json();
    return response.data;
  },
  deleteAccount: async () => {
    const fetchData = await fetchWithAuth("/api/user/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response: DeleteAccountResponseType = await fetchData.json();
    return response.data;
  },
};
