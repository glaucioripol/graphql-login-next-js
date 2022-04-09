import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const isAuthenticated = req.cookies["auth-token"];

  const unauthenticatedRoutes = ["/", "/signup"];

  if (isAuthenticated && unauthenticatedRoutes.includes(url.pathname)) {
    console.log("isAuthenticated", isAuthenticated);
    url.pathname = `/authenticated/profile`;

    return NextResponse.redirect(url);
  }
}
