import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/auth/signin`, {
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
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process Signin request" },
      { status: 500 }
    );
  }
}
