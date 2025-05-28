import { OrderItems } from "@/store/order-store";
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
    console.log("data", data);
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

type updateOrderBody = {
  items?: OrderItems[];
  active?: boolean;
  totalPrice?: number;
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const bodyObject: Partial<updateOrderBody> = {};

    if (body.items) {
      bodyObject.items = body.items;
    }

    if (body.totalPrice) {
      bodyObject.totalPrice = body.totalPrice;
    }

    if (body.active !== undefined) {
      bodyObject.active = body.active;
    }

    const response = await fetch(`http://localhost:8080/order/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObject),
    });
    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("PATCH request error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process PATCH request" },
      { status: 500 }
    );
  }
}
