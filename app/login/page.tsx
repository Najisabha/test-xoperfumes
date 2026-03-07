"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { UserCircle, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()
  const redirectTo = searchParams.get("redirect") || "/account"

  const identifierSchema = z
    .string()
    .min(1, t.validation.identifierRequired)
    .refine(
      (val) => {
        const trimmed = val.trim()
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
        const digitsOnly = trimmed.replace(/\D/g, "")
        const isPhone = digitsOnly.length >= 10
        return isEmail || isPhone
      },
      { message: t.validation.identifierInvalid }
    )

  const loginSchema = z.object({
    identifier: identifierSchema,
    password: z.string().min(6, t.validation.passwordMin),
  })

  const signupSchema = z.object({
    name: z.string().min(2, t.validation.nameRequired),
    identifier: identifierSchema,
    password: z.string().min(8, t.validation.passwordMinSignup),
  })

  type LoginForm = z.infer<typeof loginSchema>
  type SignupForm = z.infer<typeof signupSchema>

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  })

  const signupForm = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", identifier: "", password: "" },
  })

  const onLogin = (data: LoginForm) => {
    console.log("Login", data)
    // TODO: Set auth-token cookie when real auth is implemented
    router.push(redirectTo)
  }

  const onSignup = (data: SignupForm) => {
    console.log("Signup", data)
    // TODO: Set auth-token cookie when real auth is implemented
    router.push(redirectTo)
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
  }

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <TopBar />
      <Navbar />
      <MobileBottomNav />

      <div className="flex min-h-[calc(100vh-140px)]">
        {/* Left: Form */}
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t.login.welcome}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {t.login.subtitle}
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2 rounded-xl bg-muted/60 p-1">
              <TabsTrigger
                value="login"
                className="rounded-lg font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                {t.login.loginTab}
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="rounded-lg font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                {t.login.signupTab}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-identifier">{t.login.identifier}</Label>
                  <div className="relative">
                    <UserCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="login-identifier"
                      type="text"
                      inputMode="email"
                      autoComplete="username"
                      placeholder={t.login.identifierPlaceholder}
                      className="h-11 rounded-xl border-2 pl-4 pr-10 focus-visible:border-accent"
                      {...loginForm.register("identifier")}
                    />
                  </div>
                  {loginForm.formState.errors.identifier && (
                    <p className="text-xs text-destructive">
                      {loginForm.formState.errors.identifier.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">{t.login.password}</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t.login.passwordPlaceholder}
                      className="h-11 rounded-xl border-2 pl-4 pr-20 focus-visible:border-accent"
                      dir="ltr"
                      {...loginForm.register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-xs text-destructive">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input type="checkbox" className="rounded border-border" />
                    {t.login.rememberMe}
                  </label>
                  <Link href="/forgot-password" className="text-sm text-accent hover:underline">
                    {t.login.forgotPassword}
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-primary font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                  size="lg"
                >
                  {t.login.loginBtn}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">{t.login.fullName}</Label>
                  <Input
                    id="signup-name"
                    placeholder={t.login.fullNamePlaceholder}
                    className="h-11 rounded-xl border-2 focus-visible:border-accent"
                    {...signupForm.register("name")}
                  />
                  {signupForm.formState.errors.name && (
                    <p className="text-xs text-destructive">
                      {signupForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-identifier">{t.login.identifier}</Label>
                  <div className="relative">
                    <UserCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="signup-identifier"
                      type="text"
                      inputMode="email"
                      autoComplete="username"
                      placeholder={t.login.identifierPlaceholder}
                      className="h-11 rounded-xl border-2 pl-4 pr-10 focus-visible:border-accent"
                      {...signupForm.register("identifier")}
                    />
                  </div>
                  {signupForm.formState.errors.identifier && (
                    <p className="text-xs text-destructive">
                      {signupForm.formState.errors.identifier.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t.login.password}</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t.login.signupPassword}
                      className="h-11 rounded-xl border-2 pl-4 pr-20 focus-visible:border-accent"
                      dir="ltr"
                      {...signupForm.register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {signupForm.formState.errors.password && (
                    <p className="text-xs text-destructive">
                      {signupForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <label className="flex items-start gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" className="mt-1 rounded border-border" />
                  <span>
                    {t.login.agree}{" "}
                    <Link href="/terms" className="text-accent hover:underline">{t.login.terms}</Link>{" "}
                    {t.login.and}{" "}
                    <Link href="/privacy" className="text-accent hover:underline">{t.login.privacy}</Link>
                  </span>
                </label>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-primary font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                  size="lg"
                >
                  {t.login.createBtn}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">{t.login.orContinueWith}</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-12 rounded-xl border-2 font-medium transition-all hover:border-accent/50 hover:bg-accent/5 hover:shadow-md"
                onClick={() => handleSocialLogin("google")}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 rounded-xl border-2 font-medium transition-all hover:border-[#1877F2]/50 hover:bg-[#1877F2]/5 hover:shadow-md"
                onClick={() => handleSocialLogin("facebook")}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>

        {/* Right: Decorative Panel */}
        <div className="hidden lg:block lg:flex-1">
          <div className="relative h-full min-h-[calc(100vh-140px)] bg-gradient-to-br from-foreground via-foreground/95 to-accent/30">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
            <div className="relative flex h-full flex-col justify-end p-12 xl:p-16">
              <blockquote className="max-w-md">
                <p className="text-xl font-serif leading-relaxed text-white/90 md:text-2xl">
                  &quot;{t.login.quote}&quot;
                </p>
                <footer className="mt-4 text-sm text-white/60">
                  — xo<span className="text-accent">perfumes</span>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
