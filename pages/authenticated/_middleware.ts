import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const isUnauthenticated = !req.cookies["auth-token"];

  const authenticatedRoutes = ["/authenticated/profile"];

  if (isUnauthenticated && authenticatedRoutes.includes(url.pathname)) {
    url.pathname = `/`;
    return NextResponse.redirect(url);
  }
}
