import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { ADMIN_COOKIE, ADMIN_TOKEN } from "@/lib/admin-auth"

const AUTH_COOKIE = "auth-token"

function isAuthenticated(request: NextRequest): boolean {
  return !!request.cookies.get(AUTH_COOKIE)?.value
}

function isAdminAuthenticated(request: NextRequest): boolean {
  return request.cookies.get(ADMIN_COOKIE)?.value === ADMIN_TOKEN
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next()
    }
    if (!isAdminAuthenticated(request)) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
    return NextResponse.next()
  }

  if (["/account", "/account/orders", "/account/wishlist", "/account/addresses", "/account/profile"].some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    if (!isAuthenticated(request)) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*"],
}
