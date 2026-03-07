export const ADMIN_EMAIL = "123"
export const ADMIN_PASSWORD = "123"
export const ADMIN_COOKIE = "admin-auth"
export const ADMIN_TOKEN = "admin-authenticated"

export function verifyAdminAuth(cookieHeader: string | undefined): boolean {
  if (!cookieHeader) return false
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [key, ...v] = c.trim().split("=")
      return [key, v.join("=").trim()]
    })
  )
  return cookies[ADMIN_COOKIE] === ADMIN_TOKEN
}
