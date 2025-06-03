import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
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
    const response = await fetch(`${apiUrl}/orders/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
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
      { success: false, error: "Failed to process Delete Order request" },
      { status: 500 }
    );
  }
}

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
    const body = await request.json();
    const response = await fetch(`${apiUrl}/orders/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(
      { success: response.ok, data },
      { status: response.status }
    );
  } catch (error) {
    console.error("PATCH request error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process PATCH request" },
      { status: 500 }
    );
  }
}
