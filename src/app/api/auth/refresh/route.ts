// localhost:8080/auth/refresh

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const cookie = req.headers.get("cookie") || "";

  const response = await fetch(`${apiUrl}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie,
    },
    credentials: "include",
  });

  const data = await response.json();

  const nextResponse = NextResponse.json(data, { status: response.status });

  const setCookie = response.headers.get("set-cookie");
  if (setCookie) {
    nextResponse.headers.set("set-cookie", setCookie);
  }

  return nextResponse;
}
