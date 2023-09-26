import { AuthenticationError, PromiseReturnType } from "blitz"
import { useForm } from "@mantine/form"
import { Button, PasswordInput, Stack, TextInput } from "@mantine/core"
import { FORM_ERROR } from "@/core/components/Form"
import login from "@/features/auth/mutations/login"
import { useMutation } from "@blitzjs/rpc"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  async function onSubmit(values) {
    try {
      const user = await loginMutation(values)
      props.onSuccess?.(user)
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
      } else {
        return {
          [FORM_ERROR]:
            "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
        }
      }
    }
  }

  const form = useForm({
    initialValues: { email: "", password: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  return (
    <Stack gap={4}>
      <h1>Login</h1>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label={"Email"}
          placeholder={"your@email.com"}
          {...form.getInputProps("email")}
        />

        <PasswordInput
          withAsterisk
          label={"Password"}
          placeholder={"password"}
          {...form.getInputProps("password")}
        />

        <Button type={"submit"}>Submit</Button>
      </form>
    </Stack>
  )
}

export default LoginForm
