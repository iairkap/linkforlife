import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("next-auth.session-token");
  console.log(sessionCookie);
  /*   const customCookie = req.cookies.get("token");
  console.log(customCookie); */

  if (!sessionCookie /* || !customCookie */) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`); // use absolute URL
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard",
};
