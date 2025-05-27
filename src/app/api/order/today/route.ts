import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const cookieHeader = [
    accessToken ? `accessToken=${accessToken}` : null,
    refreshToken ? `refreshToken=${refreshToken}` : null,
  ]
    .filter(Boolean)
    .join("; ");
  try {
    const response = await fetch(`${apiUrl}/orders/today`, {
      method: "GET",
      cache: "no-store",
      credentials: "include",
      headers: {
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
    });
    const data = await response.json();
    return NextResponse.json(
      { success: response.ok, data },
      { status: response.status }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process Get Today's Orders request" },
      { status: 500 }
    );
  }
}
