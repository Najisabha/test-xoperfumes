"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Lock, Mail, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

const schema = z.object({
  email: z.string().min(1, "البريد الإلكتروني مطلوب"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
})

type FormData = z.infer<typeof schema>

export default function AdminLoginPage() {
  const [error, setError] = useState("")
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (data: FormData) => {
    setError("")
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      })

      const json = await res.json()

      if (json.success) {
        router.push("/admin/products")
        router.refresh()
      } else {
        setError(json.error || "فشل تسجيل الدخول")
      }
    } catch {
      setError("حدث خطأ. حاول مرة أخرى.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-2">
          <LayoutDashboard className="h-8 w-8 text-amber-400" />
          <h1 className="text-2xl font-bold text-white">لوحة التحكم</h1>
        </div>

        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-8 shadow-xl backdrop-blur">
          <h2 className="mb-6 text-center text-lg font-semibold text-slate-200">
            تسجيل الدخول
          </h2>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-red-500/20 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                البريد الإلكتروني
              </Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  id="email"
                  type="text"
                  dir="ltr"
                  className="h-11 rounded-xl border-slate-600 bg-slate-900/50 pr-10 text-slate-100"
                  placeholder="123"
                  {...form.register("email")}
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-xs text-red-400">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                كلمة المرور
              </Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  id="password"
                  type="password"
                  dir="ltr"
                  className="h-11 rounded-xl border-slate-600 bg-slate-900/50 pr-10 text-slate-100"
                  placeholder="123"
                  {...form.register("password")}
                />
              </div>
              {form.formState.errors.password && (
                <p className="text-xs text-red-400">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-amber-500 font-semibold text-slate-900 hover:bg-amber-400"
            >
              دخول
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-500">
            <Link href="/" className="text-amber-400 hover:underline">
              العودة للموقع
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
