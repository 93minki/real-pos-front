import { clearAuthCookies } from "@/shared/lib/clearAuthCookies";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const cookieHeader = [
      accessToken ? `accessToken=${accessToken}` : null,
      refreshToken ? `refreshToken=${refreshToken}` : null,
    ]
      .filter(Boolean)
      .join("; ");

    const response = await fetch(`${apiUrl}/user/me`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
      credentials: "include",
    });
    const result = await response.json();
    const nextResponse = NextResponse.json(
      { success: true, data: result },
      { status: response.status }
    );
    return clearAuthCookies(nextResponse);
  } catch (error) {
    const errorResponse = NextResponse.json(
      { success: false, error: "Failed to process DELETE request" },
      { status: 500 }
    );
    return clearAuthCookies(errorResponse);
  }
}
