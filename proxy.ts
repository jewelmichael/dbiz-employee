// proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/app/lib/auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("session")?.value || null;

  const isAuthRoute =
    pathname.startsWith("/signin") || pathname.startsWith("/signup");

  // your dashboard is /Dashboard (capital D)
  const isDashboardRoute =
    pathname === "/" || pathname.startsWith("/dashboard");

  // --- CASE 1: visiting signin/signup while logged in ---
  if (isAuthRoute) {
    if (!token) return NextResponse.next();

    try {
      await verifySessionToken(token);
      return NextResponse.redirect(new URL("/Dashboard", req.url));
    } catch {
      const res = NextResponse.next();
      res.cookies.delete("session");
      return res;
    }
  }

  // --- CASE 2: visiting protected route (Dashboard or Home) ---
  if (isDashboardRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    try {
      await verifySessionToken(token);
      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL("/signin", req.url));
      res.cookies.delete("session");
      return res;
    }
  }

  // --- Everything else passes ---
  return NextResponse.next();
}

// MANDATORY: static literal paths ONLY
export const config = {
  matcher: [
    "/",               // Home
    "/Dashboard/:path*", // Dashboard + nested
    "/signin",
    "/signup",
  ],
};
