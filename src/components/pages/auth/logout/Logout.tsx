"use client";

import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const Logout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logoutHandler = async () => {
    queryClient.clear();
    const response = await fetchWithAuth("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.code === "OK") {
      router.push("/signin");
    } else {
      alert(result.message || "로그아웃에 실패했습니다.");
    }
  };

  return (
    <button
      className="px-4 py-2 bg-red-500 text-white rounded"
      onClick={logoutHandler}
    >
      로그아웃
    </button>
  );
};
