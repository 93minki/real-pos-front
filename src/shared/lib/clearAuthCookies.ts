import { NextResponse } from "next/server";

export const clearAuthCookies = (response: NextResponse): NextResponse => {
  response.cookies.set("accessToken", "", {
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  response.cookies.set("refreshToken", "", {
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
};
