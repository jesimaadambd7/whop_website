import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLoginRoute = pathname === "/admin/login";
  const hasAdminSession = Boolean(request.cookies.get("ugcviss_admin_session")?.value);

  if (isAdminRoute && !isAdminLoginRoute && !hasAdminSession) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminLoginRoute && hasAdminSession) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  const isCreatorDashboard = pathname.startsWith("/creator/dashboard");
  const isCreatorLoginRoute = pathname === "/creator/login";
  const hasCreatorSession = Boolean(request.cookies.get("ugcviss_creator_session")?.value);

  if (isCreatorDashboard && !hasCreatorSession) {
    const loginUrl = new URL("/creator/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isCreatorLoginRoute && hasCreatorSession) {
    return NextResponse.redirect(new URL("/creator/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/creator/dashboard/:path*", "/creator/login"],
};
