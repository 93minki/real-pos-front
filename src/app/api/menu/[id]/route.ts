import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`http://localhost:8080/menu/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const response = await fetch(`http://localhost:8080/menu/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: body.name,
        price: body.price,
      }),
    });
    const data = await response.json();
    console.log("response data", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("PATCH request error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process PATCH request" },
      { status: 500 }
    );
  }
}
