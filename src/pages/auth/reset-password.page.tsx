import { FORM_ERROR } from "src/core/components/Form"
import { ResetPassword } from "@/features/auth/schemas"
import resetPassword from "@/features/auth/mutations/resetPassword"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { assert } from "blitz"
import { PasswordInput, Text } from "@mantine/core"
import { useForm } from "@mantine/form"

const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter()
  const token = router.query.token?.toString()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  const form = useForm({
    initialValues: { password: "", passwordConfirmation: "" },
  })

  async function onSubmit(values) {
    try {
      assert(token, "token is required.")
      await resetPasswordMutation({ ...values, token })
    } catch (error: any) {
      if (error.name === "ResetPasswordError") {
        return {
          [FORM_ERROR]: error.messag,
        }
      } else {
        return {
          [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
        }
      }
    }
  }

  return (
    <div>
      <h1>Set a New Password</h1>

      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the <Link href={Routes.Home()}>homepage</Link>
          </p>
        </div>
      ) : (
        <div>
          <Text>Reset Password</Text>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <PasswordInput withAsterisk label={"Password"} {...form.getInputProps("password")} />
            <PasswordInput
              withAsterisk
              label={"Password"}
              {...form.getInputProps("passwordConfirmation")}
            />
          </form>
        </div>
      )}
    </div>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"

export default ResetPasswordPage
