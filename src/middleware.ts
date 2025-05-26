// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("[middleware] 접근 경로:", pathname);
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    console.log("[middleware] 인증 없음 → redirect to /signin");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/order-manage", "/sales-dashboard"], // 보호할 경로
};
