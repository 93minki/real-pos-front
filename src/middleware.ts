// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  // 로그인, 회원가입 페이지는 예외
  if (["/signin", "/signup"].includes(pathname)) {
    // 로그인 사용자가 접근하면 메인으로 이동
    if (accessToken && refreshToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return;
  }

  // 그 외 모든 페이지는 보호 (AT, RT 없으면 로그인 페이지로 이동)
  if (!accessToken && !refreshToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }
  if (accessToken && !refreshToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // 로그인, 회원가입 페이지는 예외, 나머지 모든 페이지 보호
    "/((?!_next|api|static|favicon.ico|signin|signup).*)",
    "/signin",
    "/signup",
  ],
};
