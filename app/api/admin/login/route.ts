import { NextRequest, NextResponse } from "next/server"
import { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_COOKIE, ADMIN_TOKEN } from "@/lib/admin-auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body as { email?: string; password?: string }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const res = NextResponse.json({ success: true })
      res.cookies.set(ADMIN_COOKIE, ADMIN_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      })
      return res
    }

    return NextResponse.json(
      { success: false, error: "البريد أو كلمة المرور غير صحيحة" },
      { status: 401 }
    )
  } catch {
    return NextResponse.json(
      { success: false, error: "طلب غير صالح" },
      { status: 400 }
    )
  }
}
