import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export function useOrderSSE() {
  const queryClient = useQueryClient();
  const eventSourceRef = useRef<EventSource | null>(null);

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const fetchData = await fetchWithAuth("/api/user");
      const response = await fetchData.json();
      return response.data;
    },
  });

  useEffect(() => {
    // user.id가 없으면 SSE 연결을 시도하지 않음
    if (!userData?.id) {
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // 기존 연결이 있으면 닫기
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // EventSource 생성
    eventSourceRef.current = new EventSource(
      `${apiUrl}/orders/sse?userId=${userData.id}`,
      { withCredentials: true }
    );

    // 메시지 이벤트 핸들러
    eventSourceRef.current.addEventListener("orderAdded", (event) => {
      queryClient.invalidateQueries({ queryKey: ["order-list"] });
    });

    // 에러 이벤트 핸들러
    eventSourceRef.current.onerror = (error) => {
      console.error("[SSE] Connection Error:", error);
    };

    // 연결 성공 핸들러
    eventSourceRef.current.onopen = () => {
      console.log("[SSE] Connection opened");
    };

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [queryClient, userData?.id]);
}
