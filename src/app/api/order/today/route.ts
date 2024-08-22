import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("http://localhost:8080/order/today", {
      method: "GET",
    });
    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET request error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process GET request" },
      { status: 500 }
    );
  }
}
