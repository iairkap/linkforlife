import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("token");
  if (!cookie) {
    return NextResponse.redirect("http://localhost:3000/"); // use absolute URL
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard",
};
