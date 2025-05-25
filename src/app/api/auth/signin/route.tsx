import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetch("http://localhost:8080/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: body.email,
      password: body.password,
    }),
    credentials: "include",
  });

  const data = await response.json();
  const setCookie = response.headers.get("Set-Cookie");
  const nextResponse = NextResponse.json(data);

  if (setCookie) {
    nextResponse.headers.set("Set-Cookie", setCookie);
  }

  return nextResponse;
}
