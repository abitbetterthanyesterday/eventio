import form, { FORM_ERROR } from "@/core/components/Form"
import signup from "@/features/auth/mutations/signup"
import { useMutation } from "@blitzjs/rpc"
import { Button, PasswordInput, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  const form = useForm({
    initialValues: { email: "", name: "", password: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })
  const onSubmit = async (values) => {
    try {
      await signupMutation(values)
      props.onSuccess?.()
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        // This error comes from Prisma
        return { email: "This email is already being used" }
      } else {
        return { [FORM_ERROR]: error.toString() }
      }
    }
  }

  return (
    <Stack align={"flex-start"} gap={"4"}>
      <h1>Create an Account</h1>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label={"Email"}
          placeholder={"your@email.com"}
          {...form.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label={"Name"}
          placeholder={"Your name"}
          {...form.getInputProps("name")}
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

export default SignupForm
