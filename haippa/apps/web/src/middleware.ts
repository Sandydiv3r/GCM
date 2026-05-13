import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import type { SessionData } from "@/lib/session";

const sessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "haippa_session",
  cookieOptions: { secure: process.env.NODE_ENV === "production" },
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await getIronSession<SessionData>(req, NextResponse.next(), sessionOptions);
  const isAuthenticated = !!session.userId;
  const role = session.role;

  if (pathname.startsWith("/admin") && (!isAuthenticated || role !== "ADMIN")) {
    return NextResponse.redirect(new URL("/login?redirect=/admin/dashboard", req.url));
  }
  if (pathname.startsWith("/seller") && (!isAuthenticated || (role !== "ARTIST" && role !== "ADMIN"))) {
    return NextResponse.redirect(new URL("/login?redirect=/seller/dashboard", req.url));
  }
  if ((pathname.startsWith("/checkout") || pathname.startsWith("/orders")) && !isAuthenticated) {
    return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/seller/:path*", "/checkout/:path*", "/orders/:path*"],
};
