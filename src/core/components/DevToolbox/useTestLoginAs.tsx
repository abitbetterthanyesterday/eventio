import { useMutation } from "@blitzjs/rpc"
import login from "@/auth/mutations/login"

/**
 * This hook is used to login as a user or admin in development.
 * It uses the credentials from the .env.local file.
 */
export function useTestLoginAs() {
  const [$login] = useMutation(login)

  /** Login as a user or admin */
  async function loginAs(role: "admin" | "user") {
    let email: string, password: string
    switch (role) {
      case "admin":
        if (!process.env.NEXT_PUBLIC_ADMIN_EMAIL || !process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
          throw new Error(`Missing ${role} credentials in env. file`)
        }
        email = process.env.NEXT_PUBLIC_ADMIN_EMAIL
        password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
        break
      case "user":
        if (!process.env.NEXT_PUBLIC_USER_EMAIL || !process.env.NEXT_PUBLIC_USER_PASSWORD) {
          throw new Error(`Missing ${role} credentials in env. file`)
        }
        email = process.env.NEXT_PUBLIC_USER_EMAIL
        password = process.env.NEXT_PUBLIC_USER_PASSWORD
        break
      default:
        throw new Error(`Unknown role: ${role}`)
    }

    if (!email || !password) throw new Error(`Missing ${role} credentials in env. file`)
    await $login({
      email,
      password,
    })
  }

  async function loginAsAdmin() {
    await loginAs("admin")
  }

  async function loginAsUser() {
    await loginAs("user")
  }

  return { loginAsAdmin, loginAsUser }
}
