import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useOrderSSE() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const eventSource = new EventSource(`${apiUrl}/orders/sse`, {
      withCredentials: true,
    });

    eventSource.addEventListener("orderAdded", () => {
      queryClient.invalidateQueries({ queryKey: ["order-list"] });
    });

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [queryClient]);
}
