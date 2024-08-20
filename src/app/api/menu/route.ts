import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:8080/menu");

  const data = await res.json();
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch("http://localhost:8080/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: body.name,
        price: body.price,
      }),
    });
    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("POST request error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process POST request" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("body", body.menuName, body.menuPrice);
    const response = await fetch(`http://localhost:8080/menu/${body.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: body.menuName,
        price: body.menuPrice,
      }),
    });
    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("POST request error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process POST request" },
      { status: 500 }
    );
  }
}
