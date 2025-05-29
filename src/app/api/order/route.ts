import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/orders`, {
      method: "GET",
    });
    const data = await response.json();
    console.log("data", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET request error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process GET request" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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
    const response = await fetch(`${apiUrl}/orders`, {
      method: "POST",
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
    console.error("POST request error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process POST request" },
      { status: 500 }
    );
  }
}
