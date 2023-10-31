import { useMutation } from "@blitzjs/rpc"
import login from "@/auth/mutations/login"

export function useTestLoginAs() {
  const [$login] = useMutation(login)

  async function loginAs(role: "admin" | "user") {
    let email, password
    switch (role) {
      case "admin":
        email = process.env.NEXT_PUBLIC_ADMIN_EMAIL
        password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
        break
      case "user":
        email = process.env.NEXT_PUBLIC_USER_EMAIL
        password = process.env.NEXT_PUBLIC_USER_PASSWORD
        break
    }
    if (!email || !password) throw new Error(`Missing ${role} credentials in env. file`)
    await $login({
      email,
      password,
    })
  }

  function loginAsAdmin() {
    loginAs("admin")
  }

  function loginAsUser() {
    loginAs("user")
  }

  return { loginAsAdmin, loginAsUser }
}
