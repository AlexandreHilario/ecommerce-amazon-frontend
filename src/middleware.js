import { NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/cadastro", "/esqueci-senha"];
const PUBLIC_PREFIXES = ["/produtos"];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isPublic =
    PUBLIC_ROUTES.some((r) => pathname.startsWith(r)) ||
    PUBLIC_PREFIXES.some((r) => pathname.startsWith(r));

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && PUBLIC_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg).*)"],
};
