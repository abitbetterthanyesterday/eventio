import { useState } from "react"
import { useToggle } from "@mantine/hooks"
import { useMutation } from "@blitzjs/rpc"
import login from "@/auth/mutations/login"
import signup from "@/auth/mutations/signup"
import { useForm, zodResolver } from "@mantine/form"
import { Signup, signUpErrors } from "@/auth/schemas"
import { AuthenticationError } from "blitz"
import * as Sentry from "@sentry/nextjs"
import { z } from "zod"
import { notifications } from "@mantine/notifications"

export type Values = z.infer<typeof Signup>
export const initialValues = {
  email: "",
  name: "",
  password: "",
  terms: true,
}

export type UseAuthenticationForm = {
  error: Error | null
  type: "login" | "register"
  toggleType: () => void
  form: ReturnType<typeof useForm<Values>>
  onSubmit: (values: Values) => Promise<void>
}

export function useAuthenticationForm(): UseAuthenticationForm {
  const [error, setError] = useState<Error | null>(null)
  const [type, toggleType] = useToggle(["login", "register"] as const)
  const [$loginMutation] = useMutation(login)
  const [$signupMutation] = useMutation(signup)
  const form = useForm<Values>({
    initialValues: initialValues,
    validate: zodResolver(Signup),
  })

  async function onLogin(values: Values) {
    try {
      const user = await $loginMutation(values)
      notifications.show({ title: "Login success", message: `Welcome back ${user.name}!` })
    } catch (error) {
      setError(error)
      if (!(error instanceof AuthenticationError)) {
        Sentry.captureException(error)
      }
    }
  }

  const onSignup = async (values: Values) => {
    try {
      await $signupMutation(values)
    } catch (error) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        // This error comes from Prisma
        form.setErrors({ email: signUpErrors.emailAlreadyExists })
      }
    }
  }

  async function onSubmit(values: Values) {
    if (type === "login") {
      await onLogin(values)
    } else {
      await onSignup(values)
    }
  }

  return { error, type, toggleType, form, onSubmit }
}
