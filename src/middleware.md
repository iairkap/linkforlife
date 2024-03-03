import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
const sessionCookie = req.cookies.get("next-auth.session-token");

/\_ const customCookie = req.cookies.get("token");

if (!sessionCookie /_ || !customCookie _/) {
return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`); // use absolute URL
}

return NextResponse.next();
}

export const config = {
matcher: "/dashboard",
};
