import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const response = await fetch(`${apiUrl}/orders/${params.id}/complete`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
    });
    const data = await response.json();
    return NextResponse.json(
      { success: data.ok, data },
      { status: response.status }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process Complete Order request" },
      { status: 500 }
    );
  }
}
