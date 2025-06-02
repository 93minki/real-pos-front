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
    const year = request.nextUrl.searchParams.get("year");
    const month = request.nextUrl.searchParams.get("month");

    const response = await fetch(
      `${apiUrl}/orders/monthly?year=${year}&month=${month}`,
      {
        method: "GET",
        cache: "no-store",
        credentials: "include",
        headers: {
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(
      { success: response.ok, data },
      { status: response.status }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process GET Monthly Orders request" },
      { status: 500 }
    );
  }
}
