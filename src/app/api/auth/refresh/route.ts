import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const cookie = request.headers.get("cookie") || "";
    const response = await fetch(`${apiUrl}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie,
      },
      credentials: "include",
    });

    const data = await response.json();
    const setCookie = response.headers.get("Set-Cookie");
    const nextResponse = NextResponse.json(data, { status: response.status });

    if (setCookie) {
      nextResponse.headers.set("Set-Cookie", setCookie);
    }

    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process Refresh request" },
      { status: 500 }
    );
  }
}
