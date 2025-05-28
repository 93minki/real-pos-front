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
    const response = await fetch(`${apiUrl}/menus/${params.id}`, {
      method: "DELETE",
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
      { success: false, error: "Failed to process Delete Menu request" },
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
    const body = await request.json();
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const cookieHeader = [
      accessToken ? `accessToken=${accessToken}` : null,
      refreshToken ? `refreshToken=${refreshToken}` : null,
    ]
      .filter(Boolean)
      .join("; ");
    const response = await fetch(`${apiUrl}/menus/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
      body: JSON.stringify({
        name: body.name,
        price: body.price,
        description: body.description,
        category: body.category,
        is_active: body.is_active,
      }),
    });
    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process PATCH request" },
      { status: 500 }
    );
  }
}
