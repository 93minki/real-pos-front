import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { UserResponseType } from "@/lib/UserResponseType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export function useOrderSSE() {
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<AbortController | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const fetchData = await fetchWithAuth("/api/user");
      const response: UserResponseType = await fetchData.json();
      return response;
    },
  });

  useEffect(() => {
    // user.id가 없으면 SSE 연결을 시도하지 않음
    if (!userData?.id) {
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    let buffer = "";
    const connectSSE = async () => {
      try {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        const response = await fetch(
          `${apiUrl}/orders/sse?userId=${userData.id}`,
          {
            method: "GET",
            headers: {
              Accept: "text/event-stream",
              "Cache-Control": "no-cache",
            },
            signal: abortControllerRef.current.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder("utf-8");

        if (!reader) {
          throw new Error("Failed to get reader");
        }
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const events = buffer.split("\n\n");
          buffer = events.pop() || "";

          for (const eventBlock of events) {
            if (eventBlock.startsWith("event: orderAdded")) {
              queryClient.invalidateQueries({ queryKey: ["order-list"] });
            }
          }
        }
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("[SSE] Connection Error:", error);
          reconnectTimeoutRef.current = setTimeout(connectSSE, 5000);
        }
      }
    };

    connectSSE();

    return () => {
      abortControllerRef.current?.abort();
      clearTimeout(reconnectTimeoutRef.current as NodeJS.Timeout);
    };
  }, [queryClient, userData?.id]);
}
