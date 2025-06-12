export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  let res = await fetch(input, { ...init, credentials: "include" });
  if (res.status === 401) {
    const refreshRes = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });
    const refreshData = await refreshRes.json();

    if (refreshRes.ok && refreshData.code === "OK") {
      res = await fetch(input, { ...init, credentials: "include" });
    } else {
      window.location.href = "/signin";
      throw new Error("로그인 필요");
    }
  }

  return res;
}
