import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Edge middleware: lib dosyası import etmeyin (Vercel Edge bundle). `lib/admin-session.ts` ile aynı değerler. */
const ADMIN_COOKIE_NAME = "dekder_admin_session";

function getAdminSessionSecret(): string {
  return process.env.ADMIN_SESSION_TOKEN ?? "3504";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const secret = getAdminSessionSecret();
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthed = token === secret;

  if (pathname === "/admin/login") {
    if (isAuthed) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthed) {
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("from", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/admin", "/admin/:path*"],
};
